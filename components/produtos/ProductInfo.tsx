"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { ShoppingCart, Heart, Share2, Minus, Plus, Truck, RotateCcw, Shield } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/contexts/CartContext"
import type { Product } from "../types"

interface ProductInfoProps {
  product: Product
  onAddToCart?: () => void
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <label
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
    >
      {children}
    </label>
  )
}

export function ProductInfo({ product, onAddToCart }: ProductInfoProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { addToCart } = useCart()
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState<{ name: string; value: string } | null>(
    product.colors?.[0] || null,
  )
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const discount = product?.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleAddToCart = () => {
    if (status !== "authenticated") {
      router.push("/login")
      return
    }
    if (product.sizes?.length && !selectedSize) {
      alert("Por favor, selecione um tamanho")
      return
    }
    addToCart({
      id: Number(product._id || product.id),
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.images?.[0] || "/placeholder.svg",
      size: selectedSize,
      color: selectedColor?.name || "",
      stockCount: product.stockCount ?? 10,
      quantity,
      originalPrice: product.originalPrice,
    })
    if (onAddToCart) onAddToCart()
  }

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= (product?.stockCount || 1)) {
      setQuantity(newQuantity)
    }
  }

  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        {/* Marca e desconto */}
        <div className="flex items-center gap-2 mt-1">
            <Badge variant="secondary" className="border border-border shadow-xl border-gray-300 ">
            {product.brand}
            </Badge>
          {discount > 0 && (
            <Badge className="bg-primary border border-border">-{discount}%</Badge>
          )}
        </div>

        {/* Nome e preço */}
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-primary-foreground">
            R$ {product.price.toFixed(2).replace(".", ",")}
          </span>
          {product.originalPrice && (
            <span className="text-lg text-muted-foreground line-through">
              R$ {product.originalPrice.toFixed(2).replace(".", ",")}
            </span>
          )}
        </div>

        {/* Descrição */}
        <p className="text-primary-foreground leading-relaxed text-justify">{product.description}</p>

        {/* Cores */}
        {(product.colors?.length ?? 0) > 0 && (
          <div className="space-y-2 mb-3">
            <Label>Cor: {selectedColor?.name}</Label>
            <div className="flex gap-2">
              {(product.colors ?? []).map((color: any) => (
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

        {/* Tamanhos */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="space-y-2 mb-6">
            <Label>Tamanho</Label>
            <div className="grid grid-cols-4 gap-2">
              {product.sizes.map((size: string) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  onClick={() => setSelectedSize(size)}
                  className="h-12 border"
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Quantidade */}
        <div className="space-y-2">
          <Label>Quantidade</Label>
          <div className="flex items-center gap-3">
            <div className="flex items-center border rounded-lg p2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="hover:bg-gray-200/50"
              >
                <Minus className="h-6 w-6" />
              </Button>
              <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= (product.stockCount || 0)}
                className="hover:bg-gray-200/50"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <span className="text-sm text-muted-foreground">
              {(product.stockCount || 0) - quantity} disponíveis
            </span>
          </div>
        </div>

        {/* Ações */}
        <div className="space-y-2">
          <Button onClick={handleAddToCart} size="lg" className="w-full border mt-4 mb-2">
            <ShoppingCart className="h-5 w-5 mr-2" />
            Adicionar ao Carrinho
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="lg"
              className="flex-1 bg-primary-foreground/5"
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

        {/* Benefícios */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t justify-items-center mt-6">
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
      </CardContent>
    </Card>
  )
}
