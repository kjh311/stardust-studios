import * as faceapi from 'face-api.js';

const MODEL_URL = 'https://justadudewhohacks.github.io/face-api.js/models';

let modelsLoaded = false;

/**
 * Loads the face-api.js models from the CDN if they haven't been loaded yet.
 */
export async function loadModels() {
  if (modelsLoaded) return;
  
  try {
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
    ]);
    modelsLoaded = true;
    console.log('Vision models loaded successfully');
  } catch (error) {
    console.error('Failed to load vision models:', error);
    throw new Error('Vision service initialization failed');
  }
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  confidence?: number;
  processedFile?: File;
  previewUrl?: string;
  metadata?: {
    sharpness: number;
    confidence: number;
    poseRatio: number;
  };
}

/**
 * Validates a file for face presence, confidence, and resolution.
 */
export async function validateHeroImage(file: File): Promise<ValidationResult> {
  // 1. Resolution Check
  const imgElement = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => resolve(img);
    img.onerror = reject;
  });

  if (imgElement.width < 512 || imgElement.height < 512) {
    return { 
      isValid: false, 
      error: 'Resolution must be at least 512x512px. Please upload a high-quality photo.' 
    };
  }

  // 2. Load models
  await loadModels();

  // 3. Detect Face with landmarks
  const detections = await faceapi.detectAllFaces(
    imgElement, 
    new faceapi.TinyFaceDetectorOptions()
  ).withFaceLandmarks();

  if (detections.length === 0) {
    URL.revokeObjectURL(imgElement.src);
    return { 
      isValid: false, 
      error: 'No face detected. Please ensure your child is clearly visible in the photo.' 
    };
  }

  if (detections.length > 1) {
    URL.revokeObjectURL(imgElement.src);
    return { 
      isValid: false, 
      error: 'Multiple faces detected. Please ensure only one person is in the photo.' 
    };
  }

  const detection = detections[0];
  const confidence = detection.detection.score;
  const CONFIDENCE_THRESHOLD = 0.6;

  if (confidence < CONFIDENCE_THRESHOLD) {
    URL.revokeObjectURL(imgElement.src);
    return { 
      isValid: false, 
      error: 'Photo is too blurry or dark. Please try a clearer shot with better lighting.' 
    };
  }

  // 4. Pose Check (Frontal vs Profile)
  const { isFrontal, ratio: poseRatio } = checkPose(detection.landmarks);
  if (!isFrontal) {
    URL.revokeObjectURL(imgElement.src);
    return {
      isValid: false,
      error: 'Please look directly at the camera for the best results. Side profiles are not ready for cinema.'
    };
  }

  // 5. Hair Cutoff Check (Eyebrow Proximity to Edge)
  const faceHeight = detection.detection.box.height;
  const leftEyebrow = detection.landmarks.getLeftEyeBrow();
  const rightEyebrow = detection.landmarks.getRightEyeBrow();
  const topEyebrowY = Math.min(
    ...leftEyebrow.map((el: faceapi.Point) => el.y), 
    ...rightEyebrow.map((el: faceapi.Point) => el.y)
  );

  // If eyebrows are within 10% of the faceHeight from the top edge, suggest there's not enough hair context
  if (topEyebrowY < faceHeight * 0.15) {
    URL.revokeObjectURL(imgElement.src);
    return {
      isValid: false,
      error: 'For best results, try a photo where your full hair is visible! High-end AI needs context.'
    };
  }

  // 6. Sharpness Check (Laplacian Variance)
  const canvas = document.createElement('canvas');
  canvas.width = imgElement.width;
  canvas.height = imgElement.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    URL.revokeObjectURL(imgElement.src);
    return { isValid: true, confidence };
  }

  ctx.drawImage(imgElement, 0, 0);
  const sharpness = calculateSharpness(ctx, canvas.width, canvas.height);
  
  console.log(`[Vision Debug] Face: ${confidence.toFixed(2)} | Sharpness: ${sharpness.toFixed(2)} | Pose: ${poseRatio.toFixed(2)}`);

  const SHARPNESS_THRESHOLD = 50;
  if (sharpness < SHARPNESS_THRESHOLD) {
    URL.revokeObjectURL(imgElement.src);
    return {
      isValid: false,
      error: 'Image is too blurry for AI processing. Please provide a sharper photo.'
    };
  }

  // 7. Active Area Analysis (Sense true content boundaries, ignoring letterboxing/artifacts)
  const activeArea = findActiveArea(ctx, canvas.width, canvas.height);
  console.log(`[Vision Debug] Active Area: ${activeArea.width}x${activeArea.height} at (${activeArea.x}, ${activeArea.y})`);

  // 8. Image Processing (Square Crop, Resize, Compress)
  // Clamp to activeArea for artifact-free result
  const { file: processedFile, url: previewUrl } = await processHeroImage(imgElement, detection.detection.box, activeArea);
  
  // Clean up original image URL
  URL.revokeObjectURL(imgElement.src);

  return { 
    isValid: true, 
    confidence, 
    processedFile, 
    previewUrl,
    metadata: {
      sharpness,
      confidence,
      poseRatio
    }
  };
}

/**
 * Heuristic pose detection based on horizontal nose tip placement relative to eyes.
 */
function checkPose(landmarks: faceapi.FaceLandmarks68): { isFrontal: boolean, ratio: number } {
  const leftEye = landmarks.getLeftEye()[0];  // Outer corner
  const rightEye = landmarks.getRightEye()[3]; // Outer corner
  const noseTip = landmarks.getNose()[3];     // Bottom of nose bridge

  // Calculate where the nose is horizontally relative to eyes
  const eyeWidth = Math.abs(rightEye.x - leftEye.x);
  const noseXOffset = noseTip.x - leftEye.x;
  const ratio = noseXOffset / eyeWidth;

  // Frontal is typically 0.5. Let's allow 0.35 to 0.65 for standard variance.
  const isFrontal = ratio > 0.35 && ratio < 0.65;
  
  return { isFrontal, ratio };
}

/**
 * Intelligent 1:1 Square Crop centering on the face area.
 * Shifts box to maintain 1:1 ratio if near image boundaries (aware of Active Area).
 */
async function processHeroImage(
  img: HTMLImageElement, 
  faceBox: faceapi.Box, 
  activeArea: { x: number, y: number, width: number, height: number }
): Promise<{ file: File, url: string }> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context not available');

  // 1. Calculate ideal square side length (Head + Generous Hair/Shoulder context)
  // Director's requirement: 2.75x height for full cinematic context
  const baseSide = faceBox.height * 2.75;

  // 2. Smart Vertical Bias: Position face in the lower-middle for header room
  const faceCenterX = faceBox.x + faceBox.width / 2;
  const faceCenterY = faceBox.y + faceBox.height / 2;

  // We want the face center to be at roughly 60% from the top of the box
  let cropX = faceCenterX - baseSide / 2;
  let cropY = faceCenterY - (baseSide * 0.6);
  let cropW = baseSide;
  let cropH = baseSide;

  // 3. Smart Shifting: If square exceeds ACTIVE AREA bounds, shift it while keeping it square
  // This ensures NO black artifacts/letterboxing pixels are included
  if (cropX < activeArea.x) cropX = activeArea.x;
  if (cropY < activeArea.y) cropY = activeArea.y;
  if (cropX + cropW > activeArea.x + activeArea.width) cropX = (activeArea.x + activeArea.width) - cropW;
  if (cropY + cropH > activeArea.y + activeArea.height) cropY = (activeArea.y + activeArea.height) - cropH;

  // Final emergency clamping (if active content is smaller than our square)
  const finalSide = Math.min(cropW, cropH, activeArea.width, activeArea.height);
  cropW = finalSide;
  cropH = finalSide;

  // Final safety clamp to active area
  if (cropX < activeArea.x) cropX = activeArea.x;
  if (cropY < activeArea.y) cropY = activeArea.y;

  // 4. Resolution downscaling (max dimension 1024px)
  const MAX_DIM = 1024;
  let targetW = finalSide;
  let targetH = finalSide;

  if (targetW > MAX_DIM) {
    targetW = MAX_DIM;
    targetH = MAX_DIM;
  }

  canvas.width = targetW;
  canvas.height = targetH;

  // Draw crop with interpolation
  ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, targetW, targetH);

  // Compress to JPEG 0.8
  const blob = await new Promise<Blob>((resolve) => {
    canvas.toBlob((b) => resolve(b!), 'image/jpeg', 0.8);
  });

  const processedFile = new File([blob], 'processed-hero.jpg', { type: 'image/jpeg' });
  const previewUrl = URL.createObjectURL(blob);

  console.log(`[Vision Debug] Cinematic Square: ${cropW.toFixed(0)}px (Active Area Aware) -> ${targetW}px | Size: ${(blob.size / 1024).toFixed(1)}KB`);

  return { 
    file: processedFile, 
    url: previewUrl 
  };
}

/**
 * Detects the "active" visual content area of an image, ignoring black letterboxing or rectangular artifacts.
 * Scans from edges to find the first significant non-black pixels.
 */
function findActiveArea(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  const threshold = 30; // Min sum of RGB to be considered "non-black"

  let top = 0;
  let bottom = height - 1;
  let left = 0;
  let right = width - 1;

  // Scan from Top
  for (let y = 0; y < height; y++) {
    let rowHasContent = false;
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      if (data[i] + data[i + 1] + data[i + 2] > threshold) {
        rowHasContent = true;
        break;
      }
    }
    if (rowHasContent) {
      top = y;
      break;
    }
  }

  // Scan from Bottom
  for (let y = height - 1; y >= top; y--) {
    let rowHasContent = false;
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      if (data[i] + data[i + 1] + data[i + 2] > threshold) {
        rowHasContent = true;
        break;
      }
    }
    if (rowHasContent) {
      bottom = y;
      break;
    }
  }

  // Scan from Left
  for (let x = 0; x < width; x++) {
    let colHasContent = false;
    for (let y = top; y <= bottom; y++) {
      const i = (y * width + x) * 4;
      if (data[i] + data[i + 1] + data[i + 2] > threshold) {
        colHasContent = true;
        break;
      }
    }
    if (colHasContent) {
      left = x;
      break;
    }
  }

  // Scan from Right
  for (let x = width - 1; x >= left; x--) {
    let colHasContent = false;
    for (let y = top; y <= bottom; y++) {
      const i = (y * width + x) * 4;
      if (data[i] + data[i + 1] + data[i + 2] > threshold) {
        colHasContent = true;
        break;
      }
    }
    if (colHasContent) {
      right = x;
      break;
    }
  }

  return {
    x: left,
    y: top,
    width: right - left + 1,
    height: bottom - top + 1
  };
}

/**
 * Calculates the variance of the Laplacian of the image.
 * A higher value indicates more sharp edges and less blur.
 */
function calculateSharpness(ctx: CanvasRenderingContext2D, width: number, height: number): number {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  
  // 1. Grayscale conversion and Laplacian Convolution
  // We'll use a 3x3 kernel: [[0, 1, 0], [1, -4, 1], [0, 1, 0]]
  const laplacianData = new Float32Array(width * height);
  
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * 4;
      
      // Get grayscale values of neighbors (R+G+B / 3)
      const getGrayscale = (px: number, py: number) => {
        const i = (py * width + px) * 4;
        return (data[i] + data[i + 1] + data[i + 2]) / 3;
      };

      const val = 
        getGrayscale(x, y - 1) + 
        getGrayscale(x - 1, y) - 4 * getGrayscale(x, y) + getGrayscale(x + 1, y) + 
        getGrayscale(x, y + 1);
      
      laplacianData[y * width + x] = val;
    }
  }

  // 2. Calculate Variance of the Laplacian values
  let sum = 0;
  for (let i = 0; i < laplacianData.length; i++) {
    sum += laplacianData[i];
  }
  const mean = sum / laplacianData.length;

  let varianceSum = 0;
  for (let i = 0; i < laplacianData.length; i++) {
    varianceSum += Math.pow(laplacianData[i] - mean, 2);
  }

  return varianceSum / laplacianData.length;
}
