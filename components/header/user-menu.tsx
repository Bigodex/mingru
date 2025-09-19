"use client";

import Link from "next/link";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export function UserMenu({ session, onAvatarClick }: any) {
  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none flex items-center space-x-2">
          <Image
            src="/placeholder-user.jpg"
            alt="Avatar"
            width={36}
            height={36}
            className="rounded-full cursor-pointer"
            onClick={onAvatarClick}
          />
          <span className="text-sm text-accent-foreground font-medium">Olá, {session.user?.name?.split(" ")[0]}!</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href="/perfil">Ver Perfil</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/meus-pedidos">Meus Pedidos</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/login" })}>
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <>
      <Button variant="default" size="sm" asChild className="bg-white/80 text-accent-foreground hover:bg-white hover:shadow-xl transition-colors">
        <Link href="/login">Entrar</Link>
      </Button>
      <Button variant="default" size="sm" asChild className="bg-white/80 text-accent-foreground hover:bg-white hover:shadow-xl transition-colors">
        <Link href="/cadastro">Cadastrar</Link>
      </Button>
    </>
  );
}
