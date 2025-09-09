"use client";

import type React from "react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { GoogleAuthButton } from "@/components/googleAuthButton";

type Props = {
  /** expõe setIsLoggingIn para o hook poder diferenciar fluxo de login */
  onStartLogin: () => void;
  onFinishLogin: () => void;
};

export function LoginForm({ onStartLogin, onFinishLogin }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    onStartLogin();

    const res = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
      // callbackUrl não influencia com redirect:false,
      // mas guardamos para o push abaixo.
    });

    if (res?.error) {
      setError("Email ou senha inválidos");
      onFinishLogin();
    } else {
      // sucesso de login (status ficará "authenticated" em breve).
      // Fazemos o push agora para evitar que o hook redirecione.
      router.push(callbackUrl);
      // Não chamamos onFinishLogin imediatamente para manter "isLoggingIn"
      // ativo até a troca de rota, evitando race condition.
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Entrar</CardTitle>
        <CardDescription className="text-center">
          Entre na sua conta para continuar comprando
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="pl-2 border border-border bg-primary-foreground/5"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Sua senha"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="pl-2 border border-border bg-primary-foreground/5"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex items-center justify-between">
            <Link href="/esqueci-senha" className="text-sm text-primary hover:underline">
              Esqueci minha senha
            </Link>
          </div>

          <Button type="submit" className="w-full border mb-3">
            Entrar
          </Button>

          {/* Google: marcamos isLoggingIn antes de iniciar o fluxo */}
          <GoogleAuthButton />
        </form>
      </CardContent>

      <CardFooter className="flex flex-col space-y-4">
        <div className="text-sm text-center text-muted-foreground">
          Não tem uma conta?{" "}
          <Link href="/cadastro" className="text-primary hover:underline font-medium">
            Cadastre-se aqui
          </Link>
        </div>
      </CardFooter>
    </>
  );
}
