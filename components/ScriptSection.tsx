"use client";

import { motion } from "framer-motion";
import { Upload } from "lucide-react";

export default function ScriptSection() {
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
          <motion.div 
            whileHover={{ borderColor: "var(--color-primary)" }}
            className="border-2 border-dashed border-outline rounded-lg p-8 md:p-12 text-center transition-colors cursor-pointer bg-surface-container-high/50 backdrop-blur-sm group"
          >
            <Upload className="w-12 h-12 text-primary mx-auto mb-6 group-hover:scale-110 transition-transform" />
            <p className="font-headline text-lg mb-2">Upload Hero Photo</p>
            <p className="text-on-surface-variant text-xs">Drag and drop or click to browse</p>
          </motion.div>
          
          {/* Floating preview element - scaled down for dashboard */}
          <motion.div 
            initial={{ rotate: 12 }}
            whileHover={{ scale: 1.05, rotate: 0 }}
            className="absolute -bottom-6 -right-6 w-32 h-32 bg-surface-container-highest rounded-lg p-2 shadow-2xl hidden md:block"
          >
            <img 
              className="w-full h-full object-cover rounded-md grayscale opacity-50" 
              src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=400&auto=format&fit=crop" 
              alt="Upload Preview Placeholder"
            />
            <div className="absolute inset-x-0 bottom-2 text-center">
              <span className="bg-primary/20 text-primary text-[8px] px-2 py-0.5 rounded uppercase font-bold backdrop-blur-md">Scanning...</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
