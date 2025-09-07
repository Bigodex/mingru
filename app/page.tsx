"use client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroBanner } from "@/components/hero-banner"
import { BenefitsBar } from "@/components/benefits-bar"
import { ProductCarousel } from "@/components/product-carousel"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"



interface Product {
  _id: string
  name: string
  description: string
  price: number
  image: string
  category: string
}

export default function HomePage() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products")
      if (res.ok) {
        const data = await res.json()
        setProducts(data)
      }
    }
    fetchProducts()
  }, [])

  const handleProfileNavigation = () => router.push("/profile")
  const handleLogout = () => console.log("Usuário deslogado")

  // separa por categoria
  const maisVendidos = products.filter((p) => p.category === "Mais Vendidos")
  const camisetas = products.filter((p) => p.category === "Camisetas")
  const calcas = products.filter((p) => p.category === "Calças")
  const jaquetas = products.filter((p) => p.category === "Jaquetas")
  const acessorios = products.filter((p) => p.category === "Acessórios")

  return (
    <div className="min-h-screen">
      <Header
        onCategoryClick={(category) => router.push(`/filter?category=${category}`)}
        onAvatarClick={() => {
          const dropdown = document.getElementById("avatar-dropdown")
          dropdown?.classList.toggle("hidden")
        }}
      />

      <div id="avatar-dropdown" className="hidden absolute right-4 mt-2 bg-white shadow-md rounded">
        <button
          onClick={handleProfileNavigation}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Ver Perfil
        </button>
        <button
          onClick={handleLogout}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Sair
        </button>
      </div>

      <main>
        <HeroBanner />
        <BenefitsBar />
        <div className="container mx-auto px-4 py-2 space-y-2">
          <ProductCarousel title="Mais Vendidos" products={maisVendidos} />
          <ProductCarousel title="Camisetas Streetwear" products={camisetas} />
          <ProductCarousel title="Calças Largas" products={calcas} />
          <ProductCarousel title="Jaquetas Oversized" products={jaquetas} />
          <ProductCarousel title="Acessórios" products={acessorios} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
