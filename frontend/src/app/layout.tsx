import type { Metadata } from "next";
import { Bitter, Space_Grotesk } from "next/font/google";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const bitter = Bitter({
  subsets: ["latin"],
  variable: "--font-bitter",
});

export const metadata: Metadata = {
  title: "TailorAI — AI Resume Tailoring",
  description:
    "Paste your LaTeX resume and a job description. TailorAI's multi-agent pipeline customizes every section while preserving factual integrity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${bitter.variable} font-sans`}>{children}</body>
    </html>
  );
}
