"use client"

import { useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useCart } from "@/contexts/CartContext"
import { Product } from "@/components/types"

interface ProductCarouselProps {
  title: string
  products: Product[]
}

export function ProductCarousel({ title, products }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { addToCart } = useCart()
  const { data: session } = useSession()
  const router = useRouter()

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  const handleAddToCart = (product: Product) => {
    if (!session) {
      router.push("/login")
      return
    }
    addToCart({
      ...product,
      id: Number(product._id),
      stockCount: product.stockCount ?? 10,
      quantity: 1,
      image: product.image || "/placeholder.svg",
    })
  }

  return (
    <section className="space-y-2 bg-muted p-4 bg-transparent">
      <div className="hidden md:block">
        {/* Web-specific section */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" onClick={scrollLeft}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={scrollRight}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="mt-4 flex space-x-4 overflow-x-auto scrollbar-hide pb-4 grab"
          style={{ cursor: "grab" }}
          onMouseDown={(e) => {
            e.currentTarget.style.cursor = "grabbing"
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.cursor = "grab"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.cursor = "grab"
          }}
        >
          {products.map((product) => (
            <Card
              key={product._id || product.id}
              className="flex-shrink-2 w-64 shadow-lg hover:shadow-lg transition-shadow bg-muted p-0 flex flex-col"
            >
              <CardContent className="p-0 flex-1 flex flex-col">
              <Link href={`/produto/${product._id || product.id}`}>
                <div className="aspect-[3/5] overflow-hidden rounded-t-lg">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 block"
                />
                </div>
              </Link>

              {/* Conteúdo centralizado e limitado */}
              <div className="p-4 space-y-4 text-center flex-1 flex flex-col justify-between">
                <div>
                <Link href={`/produto/${product._id || product.id}`}>
                  <h3 className="font-semibold hover:text-primary transition-colors line-clamp-2">
                  {product.name}
                  </h3>
                </Link>
                <p className="text-sm text-primary-foreground line-clamp-3 mt-6">
                  {product.description}
                </p>
                </div>

                <p className="text-lg font-bold text-primary-foreground">
                R$ {product.price.toFixed(2).replace(".", ",")}
                </p>
              </div>
              </CardContent>

              {/* Botão sempre no rodapé */}
              <CardFooter className="p-4 pt-0">
              <Button
                className="w-full justify-center bg-primary/70 border"
                onClick={() => handleAddToCart(product)}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Adicionar ao Carrinho
              </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:hidden">
        {/* Mobile-specific section */}
        <h2 className="col-span-2 text-xl font-bold">{title}</h2>
        {products.map((product) => (
          <Card
            key={product._id || product.id}
            className="hover:shadow-lg transition-shadow bg-muted p-0 flex flex-col"
          >
            <CardContent className="p-0 flex-1 flex flex-col">
              <Link href={`/produto/${product._id || product.id}`}>
                <div className="aspect-[3/5] overflow-hidden rounded-t-lg">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 block"
                  />
                </div>
              </Link>

              <div className="p-2 pb-0 space-y-2 text-center flex-1 flex flex-col justify-between">
                <div>
                  <Link href={`/produto/${product._id || product.id}`}>
                    <h3 className="font-semibold hover:text-primary transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-primary-foreground line-clamp-3 mt-2">
                    {product.description}
                  </p>
                </div>

                <p className="text-lg font-bold text-primary-foreground">
                  R$ {product.price.toFixed(2).replace(".", ",")}
                </p>
              </div>
            </CardContent>
            <CardFooter className="p-3 pt-0">
              <Button
                className="w-full justify-center bg-primary/70 border"
                onClick={() => handleAddToCart(product)}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                +Adicionar
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
