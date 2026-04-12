"use client";

import { motion } from "framer-motion";

const ADVENTURES = [
  {
    title: "The Space Explorer",
    category: "Sci-Fi / Episode 01",
    description: "Launch into the infinite void. A story where stars are more than light—they are memories waiting to be explored.",
    image: "/assets/space.png",
    offset: false,
  },
  {
    title: "The Enchanted Kingdom",
    category: "Fantasy / Short Film",
    description: "Deep within the lavender forest, ancient magic stirs. Every leaf has a secret, and every shadow tells a story.",
    image: "/assets/forest.png",
    offset: true,
  },
  {
    title: "The Wild Discovery",
    category: "Nature / Adventure",
    description: "Uncover the heart of the untouched jungle. Witness the raw beauty of a world that has never seen a human step.",
    image: "/assets/jungle.png",
    offset: false,
  },
];

export default function Adventure() {
  return (
    <section className="py-40 px-8">
      <div className="max-w-screen-2xl mx-auto">
        <div className="mb-20">
          <h2 className="font-headline text-4xl md:text-6xl text-on-surface">Choose Your Adventure</h2>
          <p className="text-on-surface-variant max-w-2xl mt-6 font-body text-lg">
            Every child is a hero. Pick a world and let us build the cinematic universe around them.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {ADVENTURES.map((adventure, index) => (
            <motion.div
              key={adventure.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`group flex flex-col h-full bg-surface-container-high rounded-lg overflow-hidden border border-outline-variant/15 hover:border-primary/30 transition-all ${
                adventure.offset ? "md:translate-y-12" : ""
              }`}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src={adventure.image} 
                  alt={adventure.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="font-headline text-2xl mb-4">{adventure.title}</h3>
                <p className="text-on-surface-variant mb-8 font-body leading-relaxed">
                  {adventure.description}
                </p>
                <button className="mt-auto border border-primary text-primary hover:bg-primary hover:text-on-primary py-4 px-6 rounded-lg font-bold transition-all">
                  Pick this Story
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
