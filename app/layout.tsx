import type React from "react";
import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import SessionWrapper from "@/components/SessionWrapper";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { ThemeProvider } from "next-themes"; // ✅ import do theme

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
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`font-sans ${quicksand.variable} ${GeistMono.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <SessionWrapper>
            <CartProvider>
              <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
              <Analytics />
            </CartProvider>
          </SessionWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
