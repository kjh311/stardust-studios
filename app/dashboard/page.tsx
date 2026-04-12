import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { signOut } from "../auth/actions";
import { LogOut, User, Coins, Film } from "lucide-react";

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
      <nav className="border-b border-white/5 bg-surface-container-low backdrop-blur-xl">
        <div className="max-w-screen-2xl mx-auto px-8 py-4 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tighter text-amber-200 font-headline">
            Studio Dashboard
          </div>
          <form action={signOut}>
            <button className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-colors font-bold text-sm">
              <LogOut className="w-4 h-4" />
              <span>Exit Studio</span>
            </button>
          </form>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-8 py-20">
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
              <h1 className="text-xl font-headline font-bold text-on-surface truncate max-w-[200px]">
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

        {/* Placeholder for Movie Generation */}
        <div className="glass p-12 rounded-lg border border-white/10 text-center">
          <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center mx-auto mb-6 cinematic-glow">
            <Film className="w-10 h-10 text-primary opacity-50" />
          </div>
          <h2 className="text-2xl font-headline font-bold mb-4 text-on-surface">
            Ready to Direct Your First Masterpiece?
          </h2>
          <p className="text-on-surface-variant max-w-md mx-auto mb-10 leading-relaxed font-body">
            You currently have everything configured. Use your credits to generate ultra-high definition cinematic scenes featuring your child.
          </p>
          <button className="bg-primary text-on-primary font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-primary/20 transition-all transform hover:scale-105">
            Start New Production
          </button>
        </div>
      </main>
    </div>
  );
}
