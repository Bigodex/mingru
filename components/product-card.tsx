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
    <Card className="flex-shrink-0 w-64 hover:shadow-lg transition-shadow bg-card p-0 flex flex-col">
      <CardContent className="p-0 flex-1 flex flex-col">
        {/* Imagem */}
        <Link href={`/produto/${product.id}`}>
          <div className="aspect-[3/5] overflow-hidden rounded-t-lg">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 block"
            />
          </div>
        </Link>

        {/* Conteúdo */}
        <div className="p-4 space-y-4 text-center flex-1 flex flex-col justify-between">
          <div>
            <Link href={`/produto/${product.id}`}>
              <h3 className="font-semibold hover:text-primary transition-colors line-clamp-2">
                {product.name}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground line-clamp-3 mt-2">
              {product.description}
            </p>
          </div>

          <p className="text-lg font-bold text-primary">
            R$ {product.price.toFixed(2).replace(".", ",")}
          </p>
        </div>
      </CardContent>

      {/* Botão fixo no rodapé */}
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full justify-center bg-primary/70 border"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Adicionar ao Carrinho
        </Button>
      </CardFooter>
    </Card>
  )
}
