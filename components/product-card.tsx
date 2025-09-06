"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
}

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product)
    }
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <Link href={`/produto/${product.id}`}>
          <div className="aspect-[4/5] overflow-hidden rounded-t-lg">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
        <div className="p-4 space-y-2">
          <Link href={`/produto/${product.id}`}>
            <h3 className="font-semibold hover:text-primary transition-colors">{product.name}</h3>
          </Link>
          <p className="text-sm text-muted-foreground">{product.description}</p>
          <p className="text-lg font-bold text-primary">R$ {product.price.toFixed(2).replace(".", ",")}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={handleAddToCart}>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Adicionar ao Carrinho
        </Button>
      </CardFooter>
    </Card>
  )
}
