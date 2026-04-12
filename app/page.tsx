import Hero from "@/components/Hero";
import Treatment from "@/components/Treatment";
import Adventure from "@/components/Adventure";
import FeatureGrid from "@/components/FeatureGrid";
import ScriptSection from "@/components/ScriptSection";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main className="min-h-screen bg-surface selection:bg-primary/30">
      {/* Hero Section */}
      <div id="hero">
        <Hero />
      </div>

      {/* Trailer/Treatment Section */}
      <div id="trailers">
        <Treatment />
      </div>

      {/* Adventures Section */}
      <div id="stories">
        <Adventure />
      </div>

      {/* Why Section / Feature Grid */}
      <div id="features">
        <FeatureGrid />
      </div>

      {/* Personalization Section */}
      <ScriptSection />

      {/* Social Proof */}
      <div id="social">
        <Testimonials />
      </div>

      {/* Final CTA Section */}
      <section className="py-40 px-8 relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="font-headline text-5xl md:text-7xl mb-8 leading-tight text-on-surface font-extrabold tracking-tighter">
            Ready to see them on <br /> the Big Screen?
          </h2>
          <p className="text-on-surface-variant font-body text-xl mb-12 max-w-2xl mx-auto">
            Join thousands of families who have turned bedtime stories into cinematic history.
          </p>
          <button className="bg-primary text-on-primary font-bold text-2xl px-16 py-8 rounded-full shadow-[0_0_30px_rgba(255,215,155,0.3)] hover:scale-105 transition-transform duration-300">
            Get Started
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 w-full py-20 px-8 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 max-w-screen-2xl mx-auto font-body text-sm leading-relaxed">
          <div className="text-xl font-bold text-amber-200 font-headline">Stardust Studios</div>
          <div className="flex flex-wrap justify-center gap-8">
            <a className="text-slate-500 hover:text-amber-100 transition-colors" href="#">Privacy Policy</a>
            <a className="text-slate-500 hover:text-amber-100 transition-colors" href="#">Terms of Service</a>
            <a className="text-slate-500 hover:text-amber-100 transition-colors" href="#">Contact Support</a>
            <a className="text-slate-500 hover:text-amber-100 transition-colors" href="#">AI Ethics</a>
          </div>
          <div className="text-slate-500">© 2026 Stardust Studios. Crafted for the Cinematic Universe.</div>
        </div>
      </footer>
    </main>
  );
}
