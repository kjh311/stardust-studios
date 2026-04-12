"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function Treatment() {
  return (
    <section className="py-40 px-8 bg-surface-container-low">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <span className="font-manrope uppercase tracking-widest text-secondary font-bold text-sm">Experience the Magic</span>
          <h2 className="font-headline text-4xl md:text-5xl mt-4">The Stardust Treatment</h2>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative aspect-video rounded-lg overflow-hidden border-[12px] border-surface-variant/40 backdrop-blur-md cinematic-glow group"
        >
          <img 
            className="w-full h-full object-cover" 
            src="/assets/profile.png" 
            alt="The Stardust Treatment Preview"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors cursor-pointer">
            <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
              <Play className="text-on-primary w-12 h-12 fill-on-primary ml-1" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
