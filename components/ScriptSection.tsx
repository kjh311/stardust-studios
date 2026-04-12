"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { validateHeroImage } from "@/utils/vision/faceDetector";
import { uploadHeroImageAction } from "@/app/dashboard/actions";
import { toast } from "sonner";

export default function ScriptSection() {
  const [isValidating, setIsValidating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [validationSuccess, setValidationSuccess] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [processedFile, setProcessedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [heroMetadata, setHeroMetadata] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset states and cleanup previous preview URL
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    
    setIsValidating(true);
    setIsUploading(false);
    setValidationSuccess(false);
    setUploadSuccess(false);
    setValidationError(null);
    setProcessedFile(null);
    setPreviewUrl(null);
    setHeroMetadata(null);

    try {
      const result = await validateHeroImage(file);
      
      if (result.isValid && result.processedFile && result.metadata) {
        setValidationSuccess(true);
        setProcessedFile(result.processedFile);
        setPreviewUrl(result.previewUrl || null);
        setHeroMetadata(result.metadata);
        
        // 2. Start Server Upload Transaction
        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", result.processedFile);
        
        const uploadResult = await uploadHeroImageAction(formData, result.metadata);
        
        if (uploadResult.success) {
          setUploadSuccess(true);
          toast.success("Hero photo secure! Ready for cinema production.");
        } else {
          setValidationError(uploadResult.error || "Upload failed");
          toast.error(uploadResult.error || "Could not save photo to studio storage.");
        }
      } else {
        setValidationError(result.error || "Validation failed");
      }
    } catch (err) {
      setValidationError("Could not process image. Please try another one.");
      console.error(err);
    } finally {
      setIsValidating(false);
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-surface-container-low rounded-lg p-8 md:p-12 overflow-hidden relative border border-outline-variant/15">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h2 className="font-headline text-3xl md:text-4xl text-on-surface font-bold tracking-tight">Personalize the Script</h2>
          <div className="space-y-6 font-body text-base text-on-surface-variant">
            <div className="p-6 bg-surface-container-lowest border-l-4 border-secondary rounded-r-lg cinematic-glow">
              <p className="italic text-secondary mb-2 text-xs font-bold tracking-widest uppercase">SCENE 12: THE ASCENT</p>
              <p className="text-on-surface leading-relaxed">
                And then, <span className="text-primary font-bold underline decoration-primary underline-offset-4">Leo</span> looked up at the stars, knowing that the journey had just begun. &quot;I&apos;m ready,&quot; he whispered...
              </p>
            </div>
            <p className="leading-relaxed">
              Upload a photo of your child and watch our AI studio transform their likeness into a perfectly stylized animated hero that fits seamlessly into the Pixar-inspired aesthetic.
            </p>
          </div>
        </div>
        
        <div className="relative">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
          
          <motion.div 
            onClick={handleUploadClick}
            whileHover={{ borderColor: uploadSuccess ? "var(--color-secondary)" : "var(--color-primary)" }}
            className={`border-2 border-dashed rounded-lg p-8 md:p-12 text-center transition-all cursor-pointer backdrop-blur-sm group relative overflow-hidden min-h-[300px] flex items-center justify-center ${
              uploadSuccess 
                ? "border-secondary bg-secondary/5" 
                : "border-outline bg-surface-container-high/50"
            }`}
          >
            {/* Status Overlay */}
            <AnimatePresence mode="wait">
              {isValidating ? (
                <motion.div
                  key="validating"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center"
                >
                  <Loader2 className="w-12 h-12 text-primary animate-spin mb-6" />
                  <p className="font-headline text-lg mb-2 text-primary">Analyzing Likeness</p>
                  <p className="text-on-surface-variant text-xs">Scanning for cinematic potential...</p>
                </motion.div>
              ) : isUploading ? (
                <motion.div
                  key="uploading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center"
                >
                  <Loader2 className="w-12 h-12 text-secondary animate-spin mb-6" />
                  <p className="font-headline text-lg mb-2 text-secondary">Optimizing & Saving</p>
                  <p className="text-on-surface-variant text-xs">Preparing your hero for the big screen...</p>
                </motion.div>
              ) : uploadSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center"
                >
                  <CheckCircle2 className="w-12 h-12 text-secondary mb-6" />
                  <p className="font-headline text-lg mb-2 text-secondary">Ready to Generate</p>
                  <p className="text-on-surface-variant text-xs">Hero asset officially secured</p>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center"
                >
                  <Upload className="w-12 h-12 text-primary mx-auto mb-6 group-hover:scale-110 transition-transform" />
                  <p className="font-headline text-lg mb-2">Upload Hero Photo</p>
                  <p className="text-on-surface-variant text-xs">Drag and drop or click to browse</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          {/* In-line Error/Tip Display */}
          <AnimatePresence>
            {validationError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`mt-4 p-4 border rounded-lg flex items-start gap-3 ${
                  validationError.toLowerCase().includes('hair') 
                  ? 'bg-secondary/10 border-secondary/20' 
                  : 'bg-error/10 border-error/20'
                }`}
              >
                <AlertCircle className={`w-5 h-5 shrink-0 mt-0.5 ${
                  validationError.toLowerCase().includes('hair') 
                  ? 'text-secondary' 
                  : 'text-error'
                }`} />
                <p className={`text-sm font-medium leading-tight ${
                  validationError.toLowerCase().includes('hair') 
                  ? 'text-secondary/90' 
                  : 'text-error/90'
                }`}>
                  {validationError}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating preview element - scaled down for dashboard */}
          <motion.div 
            initial={{ rotate: 12 }}
            whileHover={{ scale: 1.05, rotate: 0 }}
            className="absolute -bottom-6 -right-6 w-32 h-32 bg-surface-container-highest rounded-lg p-2 shadow-2xl hidden md:block z-10"
          >
            <div className="relative w-full h-full overflow-hidden rounded-md">
              <img 
                className={`w-full h-full object-cover transition-all duration-500 ${(isValidating || isUploading || !previewUrl) ? 'grayscale border border-white/5 opacity-50' : ''} ${(isValidating || isUploading) ? 'scale-110 blur-sm' : ''}`} 
                src={previewUrl || "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=400&auto=format&fit=crop"} 
                alt="Upload Preview"
              />
              <div className="absolute inset-x-0 bottom-2 text-center pointer-events-none">
                <span className={`px-2 py-0.5 rounded uppercase font-bold backdrop-blur-md text-[8px] transition-colors ${
                  (isValidating || isUploading) ? 'bg-primary text-on-primary animate-pulse' : 
                  uploadSuccess ? 'bg-secondary text-on-secondary' : 
                  'bg-surface-container-highest/60 text-on-surface-variant'
                }`}>
                  {isValidating ? 'Analyzing...' : isUploading ? 'Saving...' : uploadSuccess ? 'Face Optimized' : 'Ready'}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
