import type { Metadata } from "next";
import { Epilogue, Manrope } from "next/font/google";
import "./globals.css";

const epilogue = Epilogue({
  subsets: ["latin"],
  variable: "--font-epilogue",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Stardust Studios | Cinematic Narrative Experiences",
  description: "A digital interface transformed into a cinematic experience using the Celestial Narrative design system.",
};

import { createClient } from "@/utils/supabase/server";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="en" className={`${epilogue.variable} ${manrope.variable}`}>
      <body className="antialiased selection:bg-primary/30">
        <Toaster theme="dark" position="top-center" expand={true} richColors />
        <Navbar user={user} />
        {children}
      </body>
    </html>
  );
}
