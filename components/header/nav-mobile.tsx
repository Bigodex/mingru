"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { navItems } from "@/components/header/nav-items";
import { useState } from "react";

export function NavMobile({ isMenuOpen, setIsMenuOpen, session }: any) {
  const [mobileOpenCategory, setMobileOpenCategory] = useState<string | null>(null);

  if (!isMenuOpen) return null;

  return (
    <div className="md:hidden p-0 py-4 border-t border-border bg-transparent">
      <div className="flex flex-col space-y-4">
        {/* Busca */}
        <div className="relative border border-border rounded">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input type="search" placeholder="Buscar produtos..." className="pl-10 bg-muted/50" />
        </div>

        {/* Navegação Mobile */}
        <nav className="flex flex-col space-y-2">
          {navItems.map((item) => (
            <div key={item.name}>
              <button
                onClick={() => setMobileOpenCategory(mobileOpenCategory === item.name ? null : item.name)}
                className="flex items-center justify-between py-2 text-sm font-medium text-primary-foreground"
              >
                <span className="flex items-center">{item.name}</span>
                {item.submenu && (
                  <ChevronDown
                    className={`h-4 w-4 transform transition-transform ${
                      mobileOpenCategory === item.name ? "rotate-0" : "-rotate-90"
                    }`}
                  />
                )}
              </button>
              {item.submenu && mobileOpenCategory === item.name && (
                <div className="grid grid-cols-3 gap-4 mt-2 bg-muted/50 p-3 rounded-lg">
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.name}
                      href={subItem.href}
                      className="text-sm text-primary-foreground hover:text-primary"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setMobileOpenCategory(null);
                      }}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Botões de Login */}
        {!session && (
          <div className="flex justify-between space-x-2 pt-4">
            <Button variant="outline" asChild className="flex-1">
              <Link href="/login">Entrar</Link>
            </Button>
            <Button asChild className="flex-1 bg-muted/80 border border-border">
              <Link href="/cadastro">Cadastrar</Link>
            </Button>
          </div>
        )}
      </div>

      {/* Rodapé com logo */}
      {session && (
        <div className="flex items-center justify-center mt-4 space-x-2">
          <Image src="Branding/logo-oficial.svg" alt="Mingru Logo" width={36} height={36} className="rounded-full" />
          <span className="text-lg font-bold text-primary-foreground">Mingru</span>
        </div>
      )}
    </div>
  );
}
