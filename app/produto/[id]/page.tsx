"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCarousel } from "@/components/product-carousel"
import type { Product } from "@/components/types"
import { ProductImageGallery } from "@/components/produtos/ProductImageGallery"
import { ProductInfo } from "@/components/produtos/ProductInfo"
import { ProductTabs } from "@/components/produtos/ProductTabs"

// Mock reviews
const mockReviews = [
  {
    id: 1,
    user: "João Silva",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "2024-01-15",
    comment:
      "Produto excelente! A qualidade do tecido é muito boa e o caimento ficou perfeito. Recomendo!",
    helpful: 12,
  },
  {
    id: 2,
    user: "Maria Santos",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    date: "2024-01-10",
    comment:
      "Gostei muito da camiseta, mas achei que poderia ter mais opções de cores. No geral, muito satisfeita.",
    helpful: 8,
  },
  {
    id: 3,
    user: "Pedro Costa",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "2024-01-05",
    comment:
      "Chegou rapidinho e a qualidade superou minhas expectativas. Já comprei outras peças da marca.",
    helpful: 15,
  },
]

// Mock related products
const relatedProducts = [
  {
    id: 7,
    name: "Camiseta Tie Dye",
    description: "Camiseta com estampa tie dye",
    price: 99.9,
    image: "/tie-dye-t-shirt-streetwear.jpg",
  },
  {
    id: 8,
    name: "Camiseta Vintage Band",
    description: "Camiseta vintage de banda",
    price: 119.9,
    image: "/vintage-band-t-shirt-streetwear.jpg",
  },
  {
    id: 9,
    name: "Camiseta Graffiti",
    description: "Camiseta com arte graffiti",
    price: 109.9,
    image: "/graffiti-art-t-shirt-streetwear.jpg",
  },
  {
    id: 10,
    name: "Camiseta Neon",
    description: "Camiseta com detalhes neon",
    price: 129.9,
    image: "/neon-details-t-shirt-streetwear.jpg",
  },
]

export default function ProductPage({ params }: { params: { id: string | number } }) {
  const { id } = params
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const handleAddToCart = async () => {
    try {
      await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: product?._id, quantity: 1 }), // Usando _id como identificador do produto
      })
      // Se quiser atualizar o estado do carrinho na UI imediatamente:
      // addToCart({ ...product, quantity: 1 })
    } catch (err) {
      console.error(err) // Log de erro para depuração
    }
  }

  // Buscar produto do banco
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`)
        if (!res.ok) {
          setProduct(null)
          return
        }
        const data = await res.json()
        setProduct(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando produto...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Produto não encontrado.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header
        onCategoryClick={() => console.log("Category clicked")}
        onAvatarClick={() => console.log("Avatar clicked")}
      />

      <main className="container mx-auto px-4 py-4">
        {/* Grid principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
          <ProductImageGallery images={product.images} name={product.name} />
          <ProductInfo product={product} onAddToCart={handleAddToCart} />
        </div>

        {/* Abas com detalhes, especificações e reviews */}
        <ProductTabs product={product} reviews={mockReviews} />

        {/* Produtos relacionados */}
        <div className="mt-12">
          <ProductCarousel title="Camisetas Relacionadas" products={relatedProducts} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
