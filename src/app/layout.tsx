import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: {
    default: "AI Tools for Designers — Free Curated Library",
    template: "%s | AI Tools for Designers",
  },
  description:
    "A free, curated, visual-first library of working AI assets for real design tasks. Prompts, agents, templates for UI, brand, motion, and more.",
  openGraph: {
    title: "AI Tools for Designers — Free Curated Library",
    description:
      "A free, curated, visual-first library of working AI assets for real design tasks.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={`${geist.variable} font-sans antialiased`}>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
