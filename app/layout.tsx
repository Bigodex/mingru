import type React from "react";
import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import SessionWrapper from "@/components/SessionWrapper";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-quicksand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mingru | Cola na Mingru",
  description:
    "A melhor loja de roupas streetwear com estilo único e qualidade premium",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`font-sans ${quicksand.variable} ${GeistMono.variable}`}>
        <SessionWrapper>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          <Analytics />
        </SessionWrapper>
      </body>
    </html>
  );
}
