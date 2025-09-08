"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

interface ProductTabsProps {
  product: any
  reviews: any[]
}

export function ProductTabs({ product, reviews }: ProductTabsProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? "fill-primary text-primary-foreground" : "text-primary-foreground"
        }`}
      />
    ))
  }

  return (
    <Tabs defaultValue="details" className="w-full mt-12">
      <TabsList className="grid w-full h-auto grid-cols-3 border">
        <TabsTrigger value="details">Detalhes do Produto</TabsTrigger>
        <TabsTrigger value="specifications">Especificações</TabsTrigger>
        <TabsTrigger value="reviews">Avaliações ({product.reviewCount})</TabsTrigger>
      </TabsList>

      <TabsContent value="details" className="mt-4">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Características do Produto</h3>
            <ul className="space-y-2">
              {product.features?.map((feature: string, index: number) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>{feature}</span>
                </li>
              )) || <p className="text-muted-foreground">Nenhuma característica informada.</p>}
            </ul>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="specifications" className="mt-4">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Especificações Técnicas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.specifications ? (
                Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-border">
                    <span className="font-medium">{key}:</span>
                    <span className="text-muted-foreground">{String(value)}</span>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">Nenhuma especificação informada.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="reviews" className="mt-4">
        <div className="space-y-6">
          {/* Resumo */}
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
              </div>
            </CardContent>
          </Card>

          {/* Reviews individuais */}
          <div className="space-y-4">
            {reviews.map((review) => (
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
                            <div className="flex items-center gap-1">
                              {renderStars(review.rating)}
                            </div>
                            <span className="text-sm text-primary-foreground">
                              {new Date(review.date).toLocaleDateString("pt-BR")}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-primary-foreground">{review.comment}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}
