import { Shirt, Scissors, ShoppingBag as Bag, Gift } from "lucide-react";

export const navItems = [
  {
    name: "Camisetas",
    icon: Shirt,
    href: "/categoria/Camisetas",
    submenu: [
      { name: "Oversized", href: "/categoria/Camisetas/oversized" },
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
      { name: "Cargo", href: "/categoria/Calças/cargo" },
      { name: "Jogger", href: "/categoria/calcas/jogger" },
      { name: "Wide Leg", href: "/categoria/calcas/wide-leg" },
      { name: "Jeans Ripped", href: "/categoria/calcas/jeans-ripped" },
      { name: "Skinny", href: "/categoria/calcas/skinny" },
      { name: "Moletom", href: "/categoria/calcas/moletom" },
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
