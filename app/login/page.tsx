"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, LogIn, UserPlus } from "lucide-react";
import { signIn, signUp, signInWithGoogle } from "../auth/actions";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Cinematic Glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-secondary/10 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass p-8 md:p-12 rounded-lg border border-white/10 relative z-10"
      >
        <div className="text-center mb-10">
          <div className="text-3xl font-bold tracking-tighter text-amber-200 font-headline mb-2">
            Stardust Studios
          </div>
          <p className="text-on-surface-variant text-sm font-body">
            {mode === "signin"
              ? "Welcome back to the cinematic universe."
              : "Start your journey into the stars today."}
          </p>
        </div>

        {/* Google OAuth Button */}
        <button
          onClick={() => signInWithGoogle()}
          className="w-full flex items-center justify-center gap-3 bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-bold py-4 px-6 rounded-lg transition-all border border-white/5 hover:border-white/10 group"
        >
          <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              className="text-blue-400"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              className="text-green-400"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              className="text-yellow-400"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              className="text-red-400"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/5"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#191c22] px-4 text-on-surface-variant tracking-[0.2em] font-bold">
              OR
            </span>
          </div>
        </div>

        {/* Search Params Message */}
        {searchParams?.message && (
          <div className="p-4 mb-6 bg-error/10 border border-error/20 text-error text-sm rounded-lg text-center animate-pulse">
            {searchParams.message}
          </div>
        )}

        <form className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-on-surface-variant font-bold ml-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
              <input
                name="email"
                type="email"
                required
                placeholder="leo@stardust.com"
                className="w-full bg-surface-container-lowest border border-white/5 rounded-lg py-4 pl-12 pr-4 focus:border-primary/50 focus:outline-none transition-all text-on-surface"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-on-surface-variant font-bold ml-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
              <input
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full bg-surface-container-lowest border border-white/5 rounded-lg py-4 pl-12 pr-4 focus:border-primary/50 focus:outline-none transition-all text-on-surface"
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {mode === "signin" ? (
              <motion.button
                key="signin"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                formAction={signIn}
                className="w-full bg-primary text-on-primary font-bold py-4 rounded-full flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,215,155,0.2)] hover:shadow-[0_0_40px_rgba(255,215,155,0.4)] transition-all transform hover:scale-[1.02]"
              >
                <LogIn className="w-5 h-5" />
                <span>Cast My Character</span>
              </motion.button>
            ) : (
              <motion.button
                key="signup"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                formAction={signUp}
                className="w-full bg-secondary text-on-secondary font-bold py-4 rounded-full flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(237,177,255,0.2)] hover:shadow-[0_0_40px_rgba(237,177,255,0.4)] transition-all transform hover:scale-[1.02]"
              >
                <UserPlus className="w-5 h-5" />
                <span>Join the Studio</span>
              </motion.button>
            )}
          </AnimatePresence>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="text-primary hover:text-primary-fixed-dim text-sm font-bold transition-colors underline underline-offset-4 decoration-primary/30"
          >
            {mode === "signin"
              ? "New to the studio? Create an account"
              : "Already joined? Sign in here"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
