"use client";

// Importa o hook useState do React, o componente Link do Next.js, o ícone ChevronDown da biblioteca lucide-react
// e os componentes DropdownMenu relacionados, além de um array de itens de navegação (navItems).
import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { navItems } from "@/components/header/nav-items";

// Define o componente NavDesktop, que recebe uma função onCategoryClick como prop.
export function NavDesktop({ onCategoryClick }: { onCategoryClick: (cat: string) => void }) {
  // Define um estado local para controlar qual dropdown está aberto.
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    // Renderiza um elemento <nav> visível apenas em telas médias ou maiores (classe "hidden md:flex").
    <nav className="hidden md:flex items-center space-x-8 ml-8 text-primary-foreground">
      {/* Mapeia os itens de navegação (navItems) para renderizar cada um deles. */}
      {navItems.map((item) => (
        <div key={item.name}>
          {/* Verifica se o item possui um submenu. */}
          {item.submenu ? (
            // Renderiza um DropdownMenu para itens com submenu.
            <DropdownMenu onOpenChange={(open) => setOpenDropdown(open ? item.name : null)}>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-sm font-medium hover:text-primary-foreground/80 transition-colors relative group">
                {/* Exibe o nome do item e um ícone de seta (ChevronDown) que rotaciona ao abrir o dropdown. */}
                <span>{item.name}</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    openDropdown === item.name ? "rotate-0" : "rotate-180"
                  }`}
                />
                {/* Adiciona uma linha de destaque animada ao passar o mouse. */}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary-foreground transition-all duration-300 group-hover:w-full rounded-lg mt-3"></span>
              </DropdownMenuTrigger>
              {/* Renderiza o conteúdo do dropdown com os subitens. */}
              <DropdownMenuContent className="text-center">
                {item.submenu.map((subItem) => (
                  <DropdownMenuItem key={subItem.name} asChild className="justify-center">
                    {/* Cada subitem é um link para uma rota específica. */}
                    <Link href={subItem.href}>{subItem.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            // Renderiza um botão para itens sem submenu.
            <button
              onClick={() => onCategoryClick(item.name.toLowerCase())}
              className="flex items-center text-sm font-medium hover:text-primary transition-colors relative group"
            >
              {/* Exibe o nome do item. */}
              {item.name}
              {/* Adiciona uma linha de destaque animada ao passar o mouse. */}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
            </button>
          )}
        </div>
      ))}
    </nav>
  );
}
