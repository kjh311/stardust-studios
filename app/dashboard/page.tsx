import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { signOut } from "../auth/actions";
import { LogOut, User, Coins, Film } from "lucide-react";

import ScriptSection from "@/components/ScriptSection";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  // Fetch profile to get credits
  const { data: profile } = await supabase
    .from("profiles")
    .select("credits")
    .eq("id", user.id)
    .single();

  return (
    <div className="min-h-screen bg-surface">
      {/* Mini Nav */}
      <nav className="border-b border-white/5 bg-surface-container-low backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-screen-2xl mx-auto px-8 py-4 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tighter text-amber-200 font-headline flex items-center gap-2">
            <Film className="w-5 h-5 text-primary" />
            <span>Studio Dashboard</span>
          </div>
          <form action={signOut}>
            <button className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-colors font-bold text-sm">
              <LogOut className="w-4 h-4" />
              <span>Exit Studio</span>
            </button>
          </form>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* User Profile Info */}
          <div className="glass p-8 rounded-lg border border-white/10 flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <User className="w-8 h-8" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-on-surface-variant font-bold mb-1">
                Account
              </p>
              <h1 className="text-xl font-headline font-bold text-on-surface truncate max-w-[200px] md:max-w-xs">
                {user.email}
              </h1>
            </div>
          </div>

          {/* Credits Info */}
          <div className="glass p-8 rounded-lg border border-white/10 flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
              <Coins className="w-8 h-8" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-on-surface-variant font-bold mb-1">
                Story Credits
              </p>
              <h1 className="text-3xl font-headline font-bold text-on-surface">
                {profile?.credits ?? 0}
              </h1>
            </div>
          </div>
        </div>

        {/* Dynamic Production Tool: Script & Upload */}
        <div className="space-y-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="h-px flex-1 bg-white/5"></div>
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-primary/60">New Production</span>
            <div className="h-px flex-1 bg-white/5"></div>
          </div>
          
          <ScriptSection />
        </div>
      </main>
    </div>
  );
}
