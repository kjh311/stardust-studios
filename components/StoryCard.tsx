"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface StoryCardProps {
  title: string;
  category: string;
  image: string;
  description: string;
  index: number;
}

export default function StoryCard({ title, category, image, description, index }: StoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group flex flex-col glass p-6 rounded-md hover:bg-surface-container-high transition-all"
    >
      <div className="relative aspect-video rounded-md overflow-hidden mb-6">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>

      <div className="space-y-4 flex-grow">
        <span className="text-secondary text-[10px] uppercase tracking-[0.3em] font-manrope font-bold">
          {category}
        </span>
        <h3 className="text-2xl font-epilogue font-bold text-on-surface">
          {title}
        </h3>
        <p className="text-sm text-on-surface-variant font-manrope leading-relaxed">
          {description}
        </p>
      </div>

      <div className="pt-6 mt-auto">
        <button className="flex items-center gap-2 text-primary font-manrope font-bold uppercase tracking-widest text-xs group-hover:gap-4 transition-all">
          Explore Adventure
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
