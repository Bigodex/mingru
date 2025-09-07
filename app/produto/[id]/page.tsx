"use client"

import type React from "react"
import { useEffect, useState } from "react"
import {
  Minus,
  Plus,
  ShoppingCart,
  Heart,
  Share2,
  Star,
  Truck,
  RotateCcw,
  Shield,
  ZoomIn,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCarousel } from "@/components/product-carousel"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import type { Product } from "@/components/types"

interface Product {
  id: string | number
  _id?: string            // se vier do Mongo
  name: string
  description: string
  price: number
  originalPrice?: number
  image?: string          // capa do produto
  images?: string[]       // galeria
  category?: string
  subCategory?: string
  brand?: string
  sizes?: string[]
  colors?: { name: string; value: string }[]
  inStock?: boolean
  stockCount?: number
  rating?: number
  reviewCount?: number
  features?: string[]
  specifications?: Record<string, string>
}

// Mock reviews
const mockReviews = [
  {
    id: 1,
    user: "João Silva",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "2024-01-15",
    comment: "Produto excelente! A qualidade do tecido é muito boa e o caimento ficou perfeito. Recomendo!",
    helpful: 12,
  },
  {
    id: 2,
    user: "Maria Santos",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    date: "2024-01-10",
    comment: "Gostei muito da camiseta, mas achei que poderia ter mais opções de cores. No geral, muito satisfeita.",
    helpful: 8,
  },
  {
    id: 3,
    user: "Pedro Costa",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "2024-01-05",
    comment: "Chegou rapidinho e a qualidade superou minhas expectativas. Já comprei outras peças da marca.",
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
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState<{ name: string; value: string } | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

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
        if (data.colors?.length > 0) {
          setSelectedColor(data.colors[0])
        }
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

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Por favor, selecione um tamanho")
      return
    }

    const cartItem = {
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || "/placeholder.svg",
      size: selectedSize,
      color: selectedColor?.name || "",
      quantity,
    }

    console.log("Added to cart:", cartItem)
  }

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= (product?.stockCount || 1)) {
      setQuantity(newQuantity)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-primary text-primary" : "text-muted-foreground"}`}
      />
    ))
  }

  const discount = product?.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="min-h-screen">
      <Header 
        onCategoryClick={() => console.log("Category clicked")} 
        onAvatarClick={() => console.log("Avatar clicked")} 
      />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg border">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative cursor-zoom-in group">
                    <img
                      src={product?.images?.[selectedImage] || "/placeholder.svg"}
                      alt={product?.name || "Produto"}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <img
                    src={product?.images?.[selectedImage] || "/placeholder.svg"}
                    alt={product?.name || "Produto"}
                    className="w-full h-auto max-h-[80vh] object-contain"
                  />
                </DialogContent>
              </Dialog>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2">
              {product?.images?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                    selectedImage === index ? "border-primary" : "border-border hover:border-primary/50"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{product.brand}</Badge>
                {discount > 0 && <Badge className="bg-red-500 hover:bg-red-600">-{discount}%</Badge>}
              </div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">{renderStars(product.rating || 0)}</div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount} avaliações)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-primary">
                  R$ {product.price.toFixed(2).replace(".", ",")}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    R$ {product.originalPrice.toFixed(2).replace(".", ",")}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                ou 3x de R$ {(product.price / 3).toFixed(2).replace(".", ",")} sem juros
              </p>
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-3">
                <Label className="text-sm font-medium">Cor: {selectedColor?.name}</Label>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-colors ${
                        selectedColor?.name === color.name
                          ? "border-primary"
                          : "border-border hover:border-primary/50"
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-3">
                <Label className="text-sm font-medium">Tamanho</Label>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      onClick={() => setSelectedSize(size)}
                      className="h-12"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Quantidade</Label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stockCount}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">{product.stockCount} disponíveis</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button onClick={handleAddToCart} size="lg" className="w-full">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Adicionar ao Carrinho
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 bg-transparent"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart className={`h-5 w-5 mr-2 ${isWishlisted ? "fill-current text-red-500" : ""}`} />
                  {isWishlisted ? "Favoritado" : "Favoritar"}
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center gap-2 text-sm">
                <Truck className="h-4 w-4 text-primary" />
                <span>Frete grátis acima de R$ 150</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <RotateCcw className="h-4 w-4 text-primary" />
                <span>Troca em até 30 dias</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-primary" />
                <span>Compra 100% segura</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Detalhes</TabsTrigger>
              <TabsTrigger value="specifications">Especificações</TabsTrigger>
              <TabsTrigger value="reviews">Avaliações ({product.reviewCount})</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Características do Produto</h3>
                  <ul className="space-y-2">
                    {product.features?.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span>{feature}</span>
                      </li>
                    )) || <p className="text-muted-foreground">Nenhuma característica informada.</p>}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Especificações Técnicas</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.specifications
                      ? Object.entries(product.specifications).map(([key, value]) => (
                          <div key={key} className="flex justify-between py-2 border-b border-border">
                            <span className="font-medium">{key}:</span>
                            <span className="text-muted-foreground">{value}</span>
                          </div>
                        ))
                      : <p className="text-muted-foreground">Nenhuma especificação informada.</p>}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                {/* Reviews Summary */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-primary">{product.rating}</div>
                        <div className="flex items-center justify-center gap-1 mt-1">
                          {renderStars(product.rating || 0)}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {product.reviewCount} avaliações
                        </div>
                      </div>
                      <Separator orientation="vertical" className="h-16" />
                      <div className="flex-1">
                        <div className="space-y-2">
                          {[5, 4, 3, 2, 1].map((stars) => (
                            <div key={stars} className="flex items-center gap-2">
                              <span className="text-sm w-8">{stars}★</span>
                              <div className="flex-1 bg-muted rounded-full h-2">
                                <div
                                  className="bg-primary h-2 rounded-full"
                                  style={{
                                    width: `${stars === 5 ? 70 : stars === 4 ? 20 : stars === 3 ? 5 : stars === 2 ? 3 : 2}%`,
                                  }}
                                />
                              </div>
                              <span className="text-sm text-muted-foreground w-8">
                                {stars === 5 ? 89 : stars === 4 ? 25 : stars === 3 ? 7 : stars === 2 ? 4 : 2}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Individual Reviews */}
                <div className="space-y-4">
                  {mockReviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarImage src={review.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium">{review.user}</div>
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center gap-1">{renderStars(review.rating)}</div>
                                  <span className="text-sm text-muted-foreground">
                                    {new Date(review.date).toLocaleDateString("pt-BR")}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <p className="text-muted-foreground">{review.comment}</p>
                            <div className="flex items-center gap-4 text-sm">
                              <button className="text-muted-foreground hover:text-primary">
                                👍 Útil ({review.helpful})
                              </button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related */}
        <div className="mt-16">
          <ProductCarousel title="Produtos Relacionados" products={relatedProducts} />
        </div>
      </main>

      <Footer />
    </div>
  )
}

function Label({
  children,
  className,
  ...props
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <label
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
      {...props}
    >
      {children}
    </label>
  )
}
