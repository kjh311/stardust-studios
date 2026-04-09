"use client";

import StoryCard from "./StoryCard";

const ADVENTURES = [
  {
    title: "The Space Explorer",
    category: "Sci-Fi / Episode 01",
    description: "Launch into the infinite void. A story where stars are more than light—they are memories waiting to be explored.",
    image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "The Enchanted Kingdom",
    category: "Fantasy / Short Film",
    description: "Deep within the lavender forest, ancient magic stirs. Every leaf has a secret, and every shadow tells a story.",
    image: "https://images.unsplash.com/photo-1466611653911-954ff214af91?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "The Wild Discovery",
    category: "Nature / Adventure",
    description: "Uncover the heart of the untouched jungle. Witness the raw beauty of a world that has never seen a human step.",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=800&auto=format&fit=crop",
  },
];

export default function Adventure() {
  return (
    <section className="py-spacing-section px-4 md:px-8 max-w-[1400px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 space-y-4 md:space-y-0 text-left">
        <div className="space-y-4">
          <span className="text-secondary text-xs uppercase tracking-[0.3em] font-manrope font-bold">The Archives</span>
          <h2 className="text-4xl md:text-6xl font-epilogue font-bold leading-tight">Choose Your <br /><span className="text-primary">Adventure</span></h2>
        </div>
        <p className="max-w-md text-on-surface-variant font-manrope leading-relaxed">
          Each adventure is a hand-crafted cinematic experience, designed to adapt to your child&apos;s personal narrative choices.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {ADVENTURES.map((adventure, index) => (
          <StoryCard 
            key={adventure.title}
            {...adventure}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
