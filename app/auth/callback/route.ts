import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { getURL } from "@/utils/supabase/getURL";

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${getURL()}${next.slice(1)}`);
    }
  }

  // URL to redirect to after sign up process completes
  return NextResponse.redirect(`${getURL()}login?message=Could not authenticate user`);
}
