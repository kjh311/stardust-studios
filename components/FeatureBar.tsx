import { Film, Ghost, Brain } from "lucide-react";

const FEATURES = [
  { icon: Film, title: "Studio Control", desc: "You guide the narrative pace and themes." },
  { icon: Ghost, title: "Boundless Imagination", desc: "Zero limits on characters, worlds, or story arcs." },
  { icon: Brain, title: "Zero Latency AI", desc: "Cinematic frames generated in real-time." },
];

export default function FeatureBar() {
  return (
    <section className="py-24 px-4 md:px-8 bg-surface-container-low border-y border-white/5">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
        {FEATURES.map((feature) => (
          <div key={feature.title} className="flex flex-col items-center text-center space-y-4 group">
            <div className="p-4 rounded-full glass group-hover:bg-primary/20 transition-all">
              <feature.icon className="w-8 h-8 text-primary" />
            </div>
            <h4 className="text-xl font-epilogue font-bold">{feature.title}</h4>
            <p className="text-sm text-on-surface-variant font-manrope">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
