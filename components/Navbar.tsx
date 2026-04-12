"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/app/auth/actions";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { LogOut, LayoutDashboard, Sparkles } from "lucide-react";

interface NavbarProps {
  user: SupabaseUser | null;
}

export default function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();

  // Hide Navbar on Login page for a cleaner cinematic focus
  if (pathname === "/login") return null;

  return (
    <nav className="fixed top-0 w-full z-50 bg-transparent backdrop-blur-xl border-b border-white/5">
      <div className="flex justify-between items-center px-8 py-6 max-w-screen-2xl mx-auto font-headline tracking-tight">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-amber-200 flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <span>Stardust Studios</span>
        </Link>

        {/* Desktop Links - Visible for Home */}
        <div className="hidden md:flex gap-8">
          <Link className="text-slate-400 font-medium hover:text-slate-200 hover:scale-105 transition-all duration-300" href="/#trailers">Trailers</Link>
          <Link className="text-slate-400 font-medium hover:text-slate-200 hover:scale-105 transition-all duration-300" href="/#stories">Stories</Link>
          <Link className="text-slate-400 font-medium hover:text-slate-200 hover:scale-105 transition-all duration-300" href="/#features">Features</Link>
          <Link className="text-slate-400 font-medium hover:text-slate-200 hover:scale-105 transition-all duration-300" href="/#social">Social</Link>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link 
                href="/dashboard" 
                className="hidden md:flex items-center gap-2 text-slate-400 font-medium hover:text-slate-200 transition-colors mr-4"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
              <form action={signOut}>
                <button className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 hover:scale-95 duration-200 transition-all">
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </form>
            </>
          ) : (
            <Link 
              href="/login"
              className="bg-primary text-on-primary px-8 py-2.5 rounded-lg font-bold hover:scale-95 duration-200 transition-all shadow-[0_0_20px_rgba(255,215,155,0.2)]"
            >
              Start Creating
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
