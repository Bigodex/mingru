"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/CartContext"
import CartEmpty from "./components/CartEmpty"
import CartList from "./components/CartList"
import CouponForm from "./components/CouponForm"
import OrderSummary from "./components/OrderSummary"
import SecurePurchase from "./components/SecurePurchase"
import { useIsMounted } from "./hooks/useIsMounted"


export default function CartPage() {
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null)
  const { cartItems } = useCart()
  const mounted = useIsMounted()

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const hasOutOfStockItems = cartItems.some((item) => (item.stockCount ?? 0) <= 0)

  if (!mounted) {
    return null // Ou um spinner de carregamento
  }

  if (cartItems.length === 0) return <CartEmpty />

  return (
    <div className="min-h-screen">
      <Header onCategoryClick={() => {}} onAvatarClick={() => {}} />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/"><ArrowLeft className="h-5 w-5" /></Link>
          </Button>
            <div>
            <h1 className="text-3xl font-bold">Carrinho de Compras</h1>
            <p className="text-muted-foreground">
              {totalQuantity === 1
                ? `Você tem ${totalQuantity} item no seu carrinho`
                : `Você tem ${totalQuantity} itens no seu carrinho`}
            </p>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <CartList cartItems={cartItems} />
          <div className="space-y-6">
            <CouponForm 
              couponCode={couponCode} 
              setCouponCode={setCouponCode} 
              appliedCoupon={appliedCoupon} 
              setAppliedCoupon={setAppliedCoupon} 
            />
            <OrderSummary 
              cartItems={cartItems} 
              subtotal={subtotal} 
              appliedCoupon={appliedCoupon}
              hasOutOfStockItems={hasOutOfStockItems}
            />
            <SecurePurchase />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
