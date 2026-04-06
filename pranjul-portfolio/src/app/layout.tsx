import type { Metadata } from "next";
import { serif, sans, mono } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.generativedge.com"),
  title: "Pranjul Pal — AI Engineer",
  description:
    "AI Engineer specializing in autonomous agents, multi-agent orchestration, LLMs, and production AI systems. Building with OpenClaw, NemoClaw, CrewAI at DeepVidya.ai.",
  keywords: [
    "AI Engineer",
    "Pranjul Pal",
    "OpenClaw",
    "NemoClaw",
    "CrewAI",
    "LangChain",
    "Autonomous Agents",
    "Agentic AI",
    "DeepVidya",
    "Bengaluru",
  ],
  authors: [{ name: "Pranjul Pal" }],
  openGraph: {
    title: "Pranjul Pal — AI Engineer",
    description: "I teach machines to think, decide, and act on their own.",
    url: "https://www.generativedge.com",
    siteName: "Pranjul Pal Portfolio",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pranjul Pal — AI Engineer",
    description: "I teach machines to think, decide, and act on their own.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.generativedge.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
