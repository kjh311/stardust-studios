"use client";

import { motion } from "framer-motion";

const FILM_STRIP = [
  { id: 1, title: "Outer Space", image: "/assets/space.png" },
  { id: 2, title: "Magic Forest", image: "/assets/forest.png" },
  { id: 3, title: "Lost Jungle", image: "/assets/jungle.png" },
  { id: 4, title: "Pirate Skies", image: "/assets/pirate.png" },
];

export default function Hero() {
  // Duplicate for infinite scroll
  const marqueeItems = [...FILM_STRIP, ...FILM_STRIP];

  return (
    <section className="pt-32 pb-20 px-8 bg-surface">
      <div className="max-w-screen-2xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="font-headline text-5xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter mb-8 leading-[0.9] text-on-surface"
        >
          Turn Their <br /> 
          <span className="text-primary italic">Imagination</span> <br /> 
          Into a Movie Masterpiece
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center mb-16"
        >
          <button className="bg-primary text-on-primary font-headline font-bold text-xl px-12 py-6 rounded-full shadow-[0_0_20px_rgba(255,215,155,0.2)] hover:shadow-[0_0_40px_rgba(255,215,155,0.4)] transition-all duration-300 transform hover:scale-105">
            Cast My Child Now
          </button>
        </motion.div>

        {/* Scrolling Carousel */}
        <div className="relative w-screen left-1/2 -ml-[50vw] overflow-hidden">
          <motion.div 
            className="flex gap-6 w-max px-8 py-4"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {marqueeItems.map((item, index) => (
              <div 
                key={`${item.id}-${index}`} 
                className="min-w-[280px] md:min-w-[400px] h-[500px] rounded-lg overflow-hidden flex-shrink-0 group relative cursor-pointer cinematic-glow"
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 to-transparent" />
                <div className="absolute bottom-6 left-6 text-left">
                  <span className="text-primary text-xs uppercase tracking-[0.2em] font-bold">{item.title}</span>
                </div>
              </div>
            ))}
          </motion.div>
          
          {/* Gradient Decoders */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-surface to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-surface to-transparent z-10" />
        </div>
      </div>
    </section>
  );
}
