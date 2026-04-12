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

  // Resolution of URL.createObjectURL to avoid memory leaks
  URL.revokeObjectURL(imgElement.src);

  if (detections.length === 0) {
    return { 
      isValid: false, 
      error: 'No face detected. Please ensure your child is clearly visible in the photo.' 
    };
  }

  if (detections.length > 1) {
    return { 
      isValid: false, 
      error: 'Multiple faces detected. Please ensure only one person is in the photo.' 
    };
  }

  const confidence = detections[0].score;
  const CONFIDENCE_THRESHOLD = 0.6;

  if (confidence < CONFIDENCE_THRESHOLD) {
    return { 
      isValid: false, 
      error: 'Photo is too blurry or dark. Please try a clearer shot with better lighting.' 
    };
  }

  return { isValid: true, confidence };
}
