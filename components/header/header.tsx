"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

import { Logo } from "@/components/header/logo";
import { NavDesktop } from "@/components/header/nav-desktop";
import { SearchBar } from "@/components/header/search-bar";
import { CartButton } from "@/components/header/cart-button";
import { UserMenu } from "@/components/header/user-menu";
import { NavMobile } from "@/components/header/nav-mobile";

interface HeaderProps {
  onCategoryClick: (category: string) => void;
  onAvatarClick: () => void;
}

export function Header({ onCategoryClick, onAvatarClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-primary border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Navegação Desktop */}
          <NavDesktop onCategoryClick={onCategoryClick} />

          {/* Busca */}
          <SearchBar />

          {/* Ações */}
          <div className="flex items-center space-x-4">
            <CartButton session={session} router={router} mounted={mounted} />
            <UserMenu session={session} onAvatarClick={onAvatarClick} />

            {/* Botão Mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-20 w-20" /> : <Menu className="h-20 w-20" />}
            </Button>
          </div>
        </div>

        {/* Menu Mobile */}
        <NavMobile
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          session={session}
        />
      </div>
    </header>
  );
}
