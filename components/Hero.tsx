"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const FILM_STRIP = [
  { id: 1, title: "Outer Space", image: "/assets/space.png" },
  { id: 2, title: "Magic Forest", image: "/assets/forest.png" },
  { id: 3, title: "Lost Jungle", image: "/assets/jungle.png" },
  { id: 4, title: "Infinite Sea", image: "/assets/space.png" }, // Reusing space for variety in marquee
];

export default function Hero() {
  // Duplicate images for infinite scroll
  const marqueeItems = [...FILM_STRIP, ...FILM_STRIP];

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

      {/* Infinite Scrolling Film Strip */}
      <div className="mt-24 w-full overflow-hidden relative group">
        <motion.div 
          className="flex gap-4 w-max"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
        >
          {marqueeItems.map((item, index) => (
            <div key={`${item.id}-${index}`} className="flex-shrink-0 w-64 md:w-96 aspect-[16/9] rounded-md overflow-hidden glass-sheen relative group/item">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity flex items-end p-6">
                <span className="text-on-surface font-manrope font-bold text-xs uppercase tracking-widest">{item.title}</span>
              </div>
            </div>
          ))}
        </motion.div>
        
        {/* Gradient Fades for Marquee */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-surface to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-surface to-transparent z-10" />
      </div>
    </section>
  );
}
