"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { Search, ShoppingCart, Menu, X, ChevronDown, Home, Scissors, ShoppingBag as Bag, Gift, Shirt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  onCategoryClick: (category: string) => void;
  onAvatarClick: () => void;
}

export function Header({ onCategoryClick, onAvatarClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const { cartItems = [] } = useCart();
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: session } = useSession();

  const navItems = [
    {
      name: "Camisetas",
      icon: Shirt,
      href: "/categoria/Camisetas",
      submenu: [
        { name: "Oversized", href: "/categoria/Camisetas/Oversized" },
        { name: "Longline", href: "/categoria/Camisetas/longline" },
        { name: "Graphic Tee", href: "/categoria/Camisetas/graphic-tee" },
        { name: "Tie Dye", href: "/categoria/Camisetas/tie-dye" },
        { name: "Vintage/Retro", href: "/categoria/Camisetas/vintage" },
        { name: "Básica Minimal", href: "/categoria/Camisetas/basica" },
      ],
    },
    {
      name: "Calças",
      icon: Scissors,
      href: "/categoria/Calcas/calcas",
      submenu: [
        { name: "Cargo", href: "/categoria/masculino/Calças/cargo" },
        { name: "Jogger", href: "/categoria/masculino/calcas/jogger" },
        { name: "Wide Leg", href: "/categoria/masculino/calcas/wide-leg" },
        { name: "Jeans Ripped", href: "/categoria/masculino/calcas/jeans-ripped" },
        { name: "Skinny", href: "/categoria/masculino/calcas/skinny" },
        { name: "Moletom", href: "/categoria/masculino/calcas/moletom" },
      ],
    },
    {
      name: "Calçados",
      icon: Bag,
      href: "/categoria/calcados",
      submenu: [
        { name: "Sneakers", href: "/categoria/calcados/sneakers" },
        { name: "Tênis Chunky", href: "/categoria/calcados/chunky" },
        { name: "Tênis Cano Alto", href: "/categoria/calcados/cano-alto" },
        { name: "Slip-On", href: "/categoria/calcados/slip-on" },
        { name: "Skate Shoes", href: "/categoria/calcados/skate" },
        { name: "Botas Street", href: "/categoria/calcados/botas" },
      ],
    },
    {
      name: "Acessórios",
      icon: Gift,
      href: "/categoria/acessorios",
      submenu: [
        { name: "Bonés", href: "/categoria/acessorios/bones" },
        { name: "Toucas", href: "/categoria/acessorios/toucas" },
        { name: "Meias", href: "/categoria/acessorios/meias" },
        { name: "Anéis", href: "/categoria/acessorios/aneis" },
        { name: "Pulseiras", href: "/categoria/acessorios/pulseiras" },
        { name: "Colares", href: "/categoria/acessorios/colares" },
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-primary/80 border-b border-border ">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center group relative">
              <Home className="h-6 w-6 text-primary-foreground absolute opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              <Image
              src="/Branding/logo-oficial.svg"
              alt="Mingru"
              width={60}
              height={60}
              className="object-cover transition-transform duration-200 transform translate-x-0 group-hover:translate-x-7 bg-primary-foreground/90 rounded-full mt-0"
              />
            </div>
          </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 ml-8">
            {navItems.map((item) => (
              <div key={item.name}>
              {item.submenu ? (
              <DropdownMenu
              onOpenChange={(open) => setOpenDropdown(open ? item.name : null)}
              >
              <DropdownMenuTrigger className="flex items-center space-x-1 text-sm font-medium hover:text-primary-foreground/80 transition-colors relative group">
                <span>{item.name}</span>
                <ChevronDown
                className={`h-4 w-4 transition-transform ${
                openDropdown === item.name ? "rotate-0" : "rotate-180"
                }`}
                />
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary-foreground transition-all duration-300 group-hover:w-full rounded-lg mt-3"></span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="text-center">
                {item.submenu.map((subItem) => (
                <DropdownMenuItem
                key={subItem.name}
                asChild
                className="justify-center"
                >
                <Link href={subItem.href}>{subItem.name}</Link>
                </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
              </DropdownMenu>
              ) : (
              <button
              onClick={() => onCategoryClick(item.name.toLowerCase())}
              className="flex items-center text-sm font-medium hover:text-primary transition-colors relative group"
              >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
              </button>
              )}
              </div>
            ))}
            </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Buscar produtos..."
                className="pl-10 border border-border bg-white/80 focus-visible:bg-white/80 focus-visible:rouded-md"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Shopping Cart */}
            <div className="relative group mr-4">
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="hover:border hover:border-border hover:bg-white/80"
              >
                <Link href="/carrinho">
                  <ShoppingCart className="h-8 w-8" />
                </Link>
              </Button>

              {mounted && totalQuantity > 0 && (
                <span
                  className="absolute -top-1 -right-1 bg-white/80 text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border border-border group-hover:bg-primary-foreground group-hover:text-white"
                  aria-label={`Itens no carrinho: ${totalQuantity}`}
                >
                  {totalQuantity}
                </span>
              )}
            </div>

            {session ? (
              // Avatar + Greeting + Dropdown
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none flex items-center space-x-2">
                  <Image
                    src="/placeholder-user.jpg"
                    alt="Avatar"
                    width={36}
                    height={36}
                    className="rounded-full cursor-pointer"
                    style={{ borderColor: "#666" }}
                    onClick={onAvatarClick}
                  />
                  <span className="text-sm font-medium">
                    Olá, {session.user?.name?.split(" ")[0]}!
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/perfil">Ver Perfil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/login" })}>
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="hidden md:flex bg-primary/0 hover:bg-white/100"
                >
                  <Link href="/login">Entrar</Link>
                </Button>
                <Button size="sm" asChild className="hidden md:flex border border-border bg-white/80">
                  <Link href="/cadastro">Cadastrar</Link>
                </Button>
              </>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <div className="relative border border-border rounded">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Buscar produtos..."
                  className="pl-10 bg-muted/50"
                />
              </div>

              {/* Mobile Navigation */}
              <nav className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <div key={item.name}>
                    <button
                      onClick={() => {
                        onCategoryClick(item.name.toLowerCase());
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center py-2 text-sm font-medium hover:text-primary transition-colors"
                    >
                      <item.icon className="mr-1 h-4 w-4" />
                      {item.name}
                    </button>
                    {item.submenu && (
                      <div className="grid grid-cols-3 gap-4 mt-2">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              {/* Mobile Auth Buttons */}
              {!session && (
                <div className="flex justify-between space-x-2 pt-4">
                  <Button variant="outline" asChild className="flex-1">
                    <Link href="/login">Entrar</Link>
                  </Button>
                  <Button asChild className="flex-1 border border-border">
                    <Link href="/cadastro">Cadastrar</Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Footer with logo */}
            {session && (
              <div className="flex items-center justify-center mt-4 space-x-2">
                <Image
                  src="/logo-oficial.svg"
                  alt="Mingru Logo"
                  width={36}
                  height={36}
                  className="rounded-full"
                />
                <span
                  className="text-lg font-bold text-primary-foreground"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Mingru
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
