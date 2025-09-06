"use client"

import { useState } from "react"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Truck, CreditCard } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Mock cart data
const initialCartItems = [
  {
    id: 1,
    name: "Camiseta Oversized Preta",
    price: 89.9,
    originalPrice: 119.9,
    image: "/black-oversized-streetwear-t-shirt.jpg",
    size: "M",
    color: "Preto",
    quantity: 2,
    inStock: true,
  },
  {
    id: 2,
    name: "Hoodie Urban Style",
    price: 159.9,
    originalPrice: 199.9,
    image: "/urban-style-hoodie-streetwear.jpg",
    size: "G",
    color: "Cinza",
    quantity: 1,
    inStock: true,
  },
  {
    id: 3,
    name: "Calça Cargo Bege",
    price: 199.9,
    originalPrice: null,
    image: "/beige-cargo-pants-streetwear.jpg",
    size: "42",
    color: "Bege",
    quantity: 1,
    inStock: false,
  },
]

interface CartItem {
  id: number
  name: string
  price: number
  originalPrice: number | null
  image: string
  size: string
  color: string
  quantity: number
  inStock: boolean
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const applyCoupon = () => {
    // Mock coupon validation
    const validCoupons = {
      DESCONTO10: 10,
      PRIMEIRA15: 15,
      FRETE20: 20,
    }

    const discount = validCoupons[couponCode.toUpperCase() as keyof typeof validCoupons]
    if (discount) {
      setAppliedCoupon({ code: couponCode.toUpperCase(), discount })
      setCouponCode("")
    } else {
      alert("Cupom inválido")
    }
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
  }

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const savings = cartItems.reduce(
    (sum, item) => sum + (item.originalPrice ? (item.originalPrice - item.price) * item.quantity : 0),
    0,
  )
  const couponDiscount = appliedCoupon ? (subtotal * appliedCoupon.discount) / 100 : 0
  const shipping = subtotal >= 150 ? 0 : 15.9
  const total = subtotal - couponDiscount + shipping

  const hasOutOfStockItems = cartItems.some((item) => !item.inStock)

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center space-y-6">
            <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Seu carrinho está vazio</h1>
              <p className="text-muted-foreground">Adicione alguns produtos incríveis para começar suas compras!</p>
            </div>
            <Button asChild size="lg">
              <Link href="/">Continuar Comprando</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Carrinho de Compras</h1>
            <p className="text-muted-foreground">{cartItems.length} itens no seu carrinho</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={`${item.id}-${item.size}-${item.color}`}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <Link href={`/produto/${item.id}`}>
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-lg hover:opacity-80 transition-opacity"
                        />
                      </Link>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <Link href={`/produto/${item.id}`}>
                            <h3 className="font-semibold hover:text-primary transition-colors">{item.name}</h3>
                          </Link>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>Tamanho: {item.size}</span>
                            <span>•</span>
                            <span>Cor: {item.color}</span>
                          </div>
                          {!item.inStock && (
                            <Badge variant="destructive" className="mt-1">
                              Fora de estoque
                            </Badge>
                          )}
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Price and Quantity */}
                      <div className="flex justify-between items-center">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-primary">
                              R$ {item.price.toFixed(2).replace(".", ",")}
                            </span>
                            {item.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                R$ {item.originalPrice.toFixed(2).replace(".", ",")}
                              </span>
                            )}
                          </div>
                          {item.originalPrice && (
                            <div className="text-xs text-green-600">
                              Você economiza R${" "}
                              {((item.originalPrice - item.price) * item.quantity).toFixed(2).replace(".", ",")}
                            </div>
                          )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center border rounded-lg">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1 || !item.inStock}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="px-3 py-1 min-w-[2rem] text-center text-sm">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={!item.inStock}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Continue Shopping */}
            <div className="pt-4">
              <Button variant="outline" asChild className="bg-transparent">
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Continuar Comprando
                </Link>
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Coupon */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Cupom de Desconto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div>
                      <div className="font-medium text-green-800">{appliedCoupon.code}</div>
                      <div className="text-sm text-green-600">{appliedCoupon.discount}% de desconto aplicado</div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={removeCoupon}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="coupon">Código do cupom</Label>
                    <div className="flex gap-2">
                      <Input
                        id="coupon"
                        placeholder="Digite o código"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      <Button onClick={applyCoupon} disabled={!couponCode.trim()}>
                        Aplicar
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} itens)</span>
                    <span>R$ {subtotal.toFixed(2).replace(".", ",")}</span>
                  </div>

                  {savings > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Economia</span>
                      <span>-R$ {savings.toFixed(2).replace(".", ",")}</span>
                    </div>
                  )}

                  {appliedCoupon && (
                    <div className="flex justify-between text-green-600">
                      <span>Desconto ({appliedCoupon.code})</span>
                      <span>-R$ {couponDiscount.toFixed(2).replace(".", ",")}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="flex items-center gap-1">
                      <Truck className="h-4 w-4" />
                      Frete
                    </span>
                    <span>{shipping === 0 ? "Grátis" : `R$ ${shipping.toFixed(2).replace(".", ",")}`}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-primary">R$ {total.toFixed(2).replace(".", ",")}</span>
                </div>

                {shipping > 0 && (
                  <div className="text-sm text-muted-foreground text-center p-2 bg-muted/50 rounded">
                    Adicione R$ {(150 - subtotal).toFixed(2).replace(".", ",")} para ganhar frete grátis
                  </div>
                )}

                {hasOutOfStockItems && (
                  <div className="text-sm text-destructive text-center p-2 bg-destructive/10 rounded">
                    Alguns itens estão fora de estoque. Remova-os para continuar.
                  </div>
                )}

                <Button asChild size="lg" className="w-full" disabled={hasOutOfStockItems}>
                  <Link href="/checkout">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Finalizar Compra
                  </Link>
                </Button>

                {/* Payment Methods */}
                <div className="text-center space-y-2">
                  <div className="text-sm text-muted-foreground">Formas de pagamento aceitas:</div>
                  <div className="flex justify-center gap-2">
                    <div className="px-2 py-1 bg-muted rounded text-xs">PIX</div>
                    <div className="px-2 py-1 bg-muted rounded text-xs">Cartão</div>
                    <div className="px-2 py-1 bg-muted rounded text-xs">Boleto</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Info */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-green-500 rounded-full" />
                  </div>
                  <div>
                    <div className="font-medium">Compra 100% Segura</div>
                    <div className="text-muted-foreground">Seus dados estão protegidos</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
