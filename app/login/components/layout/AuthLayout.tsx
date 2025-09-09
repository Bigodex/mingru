"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import type { PropsWithChildren } from "react";

export function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header
        onCategoryClick={() => console.log("Category clicked")}
        onAvatarClick={() => console.log("Avatar clicked")}
      />
      <main className="flex-1 flex items-center justify-center px-4 py-12 bg-muted/20">
        <Card className="w-full max-w-md">{children}</Card>
      </main>
      <Footer />
    </div>
  );
}
