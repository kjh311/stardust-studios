"use client";

import { motion } from "framer-motion";

export default function Treatment() {
  return (
    <section className="py-spacing-section px-4 md:px-8 max-w-[1400px] mx-auto overflow-hidden">
      <div className="text-center mb-16 space-y-4">
        <span className="text-secondary text-xs uppercase tracking-[0.3em] font-manrope font-bold">The Creative Process</span>
        <h2 className="text-4xl md:text-6xl font-epilogue font-bold">The Stardust Treatment</h2>
      </div>

      <div className="relative flex flex-col items-center">
        {/* Large Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] ambient-glow-primary pointer-events-none opacity-10" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative w-full max-w-4xl aspect-video rounded-md overflow-hidden glass-sheen"
        >
          <img 
            src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1200&auto=format&fit=crop" 
            alt="Pixar Style Character" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-60" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative -mt-16 md:-mt-24 z-20 glass p-8 md:p-12 max-w-2xl rounded-md text-center space-y-6"
        >
          <p className="text-lg md:text-xl text-on-surface leading-relaxed font-manrope">
            Our proprietary "Celestial Narrative" engine transforms your child&apos;s wildest ideas into high-fidelity animated classics. Every frame is treated with cinematic lighting, depth, and soul.
          </p>
          <div className="w-16 h-1 bg-primary mx-auto" />
        </motion.div>
      </div>
    </section>
  );
}
