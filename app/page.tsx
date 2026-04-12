import Hero from "@/components/Hero";
import Treatment from "@/components/Treatment";
import Adventure from "@/components/Adventure";
import FeatureGrid from "@/components/FeatureGrid";
import ScriptSection from "@/components/ScriptSection";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main className="min-h-screen bg-surface selection:bg-primary/30">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-transparent backdrop-blur-xl">
        <div className="flex justify-between items-center px-8 py-6 max-w-screen-2xl mx-auto font-headline tracking-tight">
          <div className="text-2xl font-bold tracking-tighter text-amber-200">Stardust Studios</div>
          <div className="hidden md:flex gap-8">
            <a className="text-slate-400 font-medium hover:text-slate-200 hover:scale-105 transition-transform duration-300" href="#">Trailers</a>
            <a className="text-slate-400 font-medium hover:text-slate-200 hover:scale-105 transition-transform duration-300" href="#">Stories</a>
            <a className="text-slate-400 font-medium hover:text-slate-200 hover:scale-105 transition-transform duration-300" href="#">Features</a>
            <a className="text-slate-400 font-medium hover:text-slate-200 hover:scale-105 transition-transform duration-300" href="#">Social</a>
          </div>
          <button className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-bold hover:scale-95 duration-200 transition-transform">
            Create Now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <Hero />

      {/* Trailer/Treatment Section */}
      <Treatment />

      {/* Adventures Section */}
      <Adventure />

      {/* Why Section / Feature Grid */}
      <FeatureGrid />

      {/* Personalization Section */}
      <ScriptSection />

      {/* Social Proof */}
      <Testimonials />

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
