import Hero from "@/components/Hero";
import Treatment from "@/components/Treatment";
import Adventure from "@/components/Adventure";
import FeatureBar from "@/components/FeatureBar";
import Testimonials from "@/components/Testimonials";
import { Film } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-surface">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/5 px-4 md:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Film className="text-primary w-6 h-6" />
          <span className="text-on-surface font-epilogue font-bold tracking-tight text-xl">Stardust Studios</span>
        </div>
        <div className="hidden md:flex gap-8 text-xs uppercase tracking-widest font-manrope font-semibold text-on-surface/70">
          <a href="#" className="hover:text-primary transition-colors">Stories</a>
          <a href="#" className="hover:text-primary transition-colors">Pricing</a>
          <a href="#" className="hover:text-primary transition-colors">About</a>
        </div>
        <button className="px-5 py-2 glass-sheen text-primary border border-primary/20 rounded-md text-xs uppercase tracking-widest font-bold">
          Sign In
        </button>
      </nav>

      {/* Hero Section */}
      <Hero />

      {/* Feature Highlighting Bar */}
      <FeatureBar />

      {/* Character Profile Section */}
      <Treatment />

      {/* The Adventures Grid */}
      <Adventure />

      {/* Personalization Banner - Simplified for assembly */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-[1200px] mx-auto glass p-12 rounded-md flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 ambient-glow-secondary opacity-20 -mr-32 -mt-32" />
          <div className="space-y-6 max-w-xl text-center md:text-left">
            <h2 className="text-4xl font-epilogue font-bold">Personalize the Script</h2>
            <p className="text-on-surface-variant font-manrope leading-relaxed">
              Input Your Child&apos;s Name, Favorite Colors, and Interests. Our AI crafts a unique narrative that puts them at the center of the action.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-md p-1 flex items-center">
              <input 
                type="text" 
                placeholder="Enter their imagination..." 
                className="bg-transparent border-none outline-none flex-grow px-4 py-2 font-manrope text-on-surface"
              />
              <button className="bg-primary text-surface px-6 py-2 rounded-sm font-bold uppercase tracking-widest text-xs">
                Draft Story
              </button>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <img 
              src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=200&auto=format&fit=crop" 
              alt="Author" 
              className="relative w-32 h-32 rounded-full object-cover border-2 border-primary/30"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Final CTA */}
      <section className="py-spacing-section px-4 md:px-8 text-center relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[400px] ambient-glow-primary pointer-events-none opacity-20" />
        <div className="relative z-10 space-y-10">
          <h2 className="text-5xl md:text-7xl font-epilogue font-bold tracking-tighter">Ready to see them on <br /> the Big Screen?</h2>
          <button className="px-12 py-6 bg-primary text-surface font-manrope font-bold uppercase tracking-[0.2em] rounded-md hover:shadow-[0_0_30px_rgba(255,215,155,0.4)] transition-all">
            Get Premier Access
          </button>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-12 border-t border-white/5 px-4 md:px-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-on-surface-variant uppercase tracking-widest">
        <p>&copy; 2026 Stardust Studios. Built with T3-Neo Stack.</p>
        <div className="flex gap-8 mt-4 md:mt-0">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Cookies</a>
        </div>
      </footer>
    </main>
  );
}
