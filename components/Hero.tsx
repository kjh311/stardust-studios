"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const FILM_STRIP = [
  { id: 1, title: "Outer Space", image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=400&auto=format&fit=crop" },
  { id: 2, title: "Magic Forest", image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=400&auto=format&fit=crop" },
  { id: 3, title: "Lost Jungle", image: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=400&auto=format&fit=crop" },
  { id: 4, title: "Deep Sea", image: "https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=400&auto=format&fit=crop" },
];

export default function Hero() {
  return (
    <section className="relative pt-32 pb-16 flex flex-col items-center justify-center overflow-hidden px-4 md:px-8">
      {/* Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] ambient-glow-primary pointer-events-none opacity-20" />

      <div className="z-10 text-center max-w-4xl space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-primary text-xs uppercase tracking-[0.2em] font-manrope font-semibold"
        >
          <Sparkles className="w-4 h-4" />
          The Stardust Animation Studio
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl md:text-8xl font-epilogue font-bold leading-[1.1] tracking-tighter text-on-surface"
        >
          Turn Their <span className="text-primary drop-shadow-[0_0_15px_rgba(255,215,155,0.4)]">Imagination</span> <br />
          Into a Movie Masterpiece
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="flex justify-center"
        >
          <button className="px-10 py-5 bg-primary text-surface font-manrope font-bold uppercase tracking-widest rounded-md hover:bg-primary-container transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,215,155,0.2)]">
            Create Your Movie
          </button>
        </motion.div>
      </div>

      {/* Film Strip Gallery */}
      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className="mt-24 w-full overflow-hidden flex justify-center"
      >
        <div className="flex gap-4 px-8 overflow-x-auto no-scrollbar pb-8">
          {FILM_STRIP.map((item) => (
            <div key={item.id} className="flex-shrink-0 w-64 md:w-80 aspect-[16/9] rounded-md overflow-hidden glass-sheen group">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-on-surface font-manrope font-bold text-xs uppercase tracking-widest">{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
