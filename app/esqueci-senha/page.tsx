"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function EsqueciSenhaPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle password reset logic here
    console.log("Password reset request for:", email)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 flex items-center justify-center px-4 py-12 bg-muted/20">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center text-primary">Email enviado!</CardTitle>
              <CardDescription className="text-center">
                Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
              </CardDescription>
            </CardHeader>

            <CardFooter className="flex flex-col space-y-4">
              <Button asChild className="w-full">
                <Link href="/login">Voltar para o login</Link>
              </Button>

              <div className="text-sm text-center text-muted-foreground">
                Não recebeu o email?{" "}
                <button onClick={() => setIsSubmitted(false)} className="text-primary hover:underline font-medium">
                  Tentar novamente
                </button>
              </div>
            </CardFooter>
          </Card>
        </main>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-12 bg-muted/20">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Esqueci minha senha</CardTitle>
            <CardDescription className="text-center">
              Digite seu email para receber instruções de redefinição de senha
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Enviar instruções
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button variant="ghost" asChild className="w-full">
              <Link href="/login" className="flex items-center justify-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Voltar para o login</span>
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
