import { Monitor, Music, ShieldCheck } from "lucide-react";

const FEATURES = [
  {
    icon: Monitor,
    title: "Studio-Grade 4K",
    desc: "Every frame rendered in glorious ultra-high definition, just like the big screen blockbusters.",
    color: "text-primary",
  },
  {
    icon: Music,
    title: "Orchestral Soundtrack",
    desc: "Custom scored music performed by digital philharmonic orchestras for maximum emotional impact.",
    color: "text-secondary",
  },
  {
    icon: ShieldCheck,
    title: "Secure-Gen Privacy",
    desc: "Your family&apos;s data is processed in an encrypted sandbox. Privacy is our production standard.",
    color: "text-tertiary",
  },
];

export default function FeatureGrid() {
  return (
    <section className="py-40 px-8 bg-surface-container-lowest">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
        {FEATURES.map((feature) => (
          <div key={feature.title} className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center mb-8 cinematic-glow transition-transform hover:scale-110">
              <feature.icon className={`w-10 h-10 ${feature.color}`} />
            </div>
            <h4 className="font-headline text-xl mb-4 font-bold">{feature.title}</h4>
            <p className="text-on-surface-variant font-body px-4 leading-relaxed">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
