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

  // 3. Detect Face
  const detections = await faceapi.detectAllFaces(
    imgElement, 
    new faceapi.TinyFaceDetectorOptions()
  );

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
  const confidence = detection.score;
  const CONFIDENCE_THRESHOLD = 0.6;

  if (confidence < CONFIDENCE_THRESHOLD) {
    URL.revokeObjectURL(imgElement.src);
    return { 
      isValid: false, 
      error: 'Photo is too blurry or dark. Please try a clearer shot with better lighting.' 
    };
  }

  // 4. Sharpness Check (Laplacian Variance)
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
  
  console.log(`[Vision Debug] Face Confidence: ${confidence.toFixed(2)} | Sharpness Score: ${sharpness.toFixed(2)}`);

  const SHARPNESS_THRESHOLD = 50;
  if (sharpness < SHARPNESS_THRESHOLD) {
    URL.revokeObjectURL(imgElement.src);
    return {
      isValid: false,
      error: 'Image is too blurry for AI processing. Please provide a sharper photo.'
    };
  }

  // 5. Image Processing (Crop, Resize, Compress)
  const { file: processedFile, url: previewUrl } = await processHeroImage(imgElement, detection.box);
  
  // Clean up original image URL
  URL.revokeObjectURL(imgElement.src);

  return { 
    isValid: true, 
    confidence, 
    processedFile, 
    previewUrl 
  };
}

/**
 * Crops the image around the face with generous padding for hair and shoulders, 
 * resizes to max 1024px, and compresses as JPEG.
 */
async function processHeroImage(img: HTMLImageElement, faceBox: faceapi.Box): Promise<{ file: File, url: string }> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context not available');

  // Generous padding: 50% of face height on top (for hair), 30% on sides/bottom (for shoulders/volume)
  const padTop = faceBox.height * 0.5;
  const padBottom = faceBox.height * 0.3;
  const padSide = faceBox.width * 0.3;

  const cropX = Math.max(0, faceBox.x - padSide);
  const cropY = Math.max(0, faceBox.y - padTop);
  const cropW = Math.min(img.width - cropX, faceBox.width + 2 * padSide);
  const cropH = Math.min(img.height - cropY, faceBox.height + padTop + padBottom);

  // Resolution downscaling (max dimension 1024px)
  const MAX_DIM = 1024;
  let targetW = cropW;
  let targetH = cropH;

  if (targetW > MAX_DIM || targetH > MAX_DIM) {
    if (targetW > targetH) {
      targetH = (MAX_DIM / targetW) * targetH;
      targetW = MAX_DIM;
    } else {
      targetW = (MAX_DIM / targetH) * targetW;
      targetH = MAX_DIM;
    }
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

  console.log(`[Vision Debug] Processed Result: ${cropW.toFixed(0)}x${cropH.toFixed(0)} -> ${targetW.toFixed(0)}x${targetH.toFixed(0)} | Size: ${(blob.size / 1024).toFixed(1)}KB`);

  return { 
    file: processedFile, 
    url: previewUrl 
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
