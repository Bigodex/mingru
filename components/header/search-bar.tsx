import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ThemeSwitch } from "@/components/header/theme-switch";

export function SearchBar() {
  return (
    <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
      {/* Botão de troca de tema */}
      <ThemeSwitch />

      {/* Campo de busca */}
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="search"
          placeholder="Buscar produtos..."
          className="pl-10 border border-border bg-white/80 focus-visible:bg-white/80 dark:bg-muted dark:text-white"
        />
      </div>
    </div>
  );
}
