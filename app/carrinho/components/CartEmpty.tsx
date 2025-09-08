"use client"

import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function CartEmpty() {
  return (
    <div className="min-h-screen">
      <Header onCategoryClick={() => {}} onAvatarClick={() => {}} />
      <main className="container mx-auto px-4 py-12">
        <div className="text-center space-y-6">
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold">Seu carrinho está vazio</h1>
          <p className="text-muted-foreground">Adicione alguns produtos incríveis!</p>
          <Button asChild size="lg"><Link href="/">Continuar Comprando</Link></Button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
