"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const REVIEWS = [
  { 
    name: "Sarah Jenkins", 
    role: "Mother of two", 
    text: "My son hasn't stopped talking about being a space captain. The quality is literally as good as anything we see on Disney+.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
  },
  { 
    name: "David Miller", 
    role: "Father of and Avid Sci-Fi Fan", 
    text: "I cried when I heard the music swell as my daughter was crowned queen of the Enchanted Kingdom. A masterpiece!",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop"
  },
  { 
    name: "Maya Rivera", 
    role: "Art Teacher", 
    text: "The attention to detail in the dinosaur animation was incredible. It felt so real and personalized to my child's features.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
  },
];

export default function Testimonials() {
  return (
    <section className="py-40 px-8 bg-surface-container-low">
      <div className="max-w-screen-2xl mx-auto">
        <h2 className="font-headline text-4xl md:text-5xl text-center mb-20 text-on-surface">
          Parental Standing Ovations
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-surface-container-high p-10 rounded-lg border border-outline-variant/15 flex flex-col hover:border-primary/20 transition-all"
            >
              <div className="flex gap-1 text-primary mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary" />
                ))}
              </div>
              <p className="text-on-surface mb-8 font-body leading-relaxed text-lg italic">
                &quot;{review.text}&quot;
              </p>
              <div className="mt-auto flex items-center gap-4">
                <img 
                  className="w-12 h-12 rounded-full object-cover border border-white/10" 
                  src={review.avatar} 
                  alt={review.name} 
                />
                <div className="flex flex-col">
                  <span className="font-headline font-bold text-sm tracking-tight">{review.name}</span>
                  <span className="text-[10px] uppercase tracking-widest text-on-surface-variant">{review.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
