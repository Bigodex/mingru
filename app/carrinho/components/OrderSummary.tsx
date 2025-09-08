"use client"

import Link from "next/link"
import { Truck, CreditCard } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import type { CartItem } from "@/components/types"

interface Props {
  cartItems: CartItem[]
  subtotal: number
  appliedCoupon: { code: string; discount: number } | null
  hasOutOfStockItems: boolean
}

export default function OrderSummary({ cartItems, subtotal, appliedCoupon, hasOutOfStockItems }: Props) {
  const savings = cartItems.reduce(
    (sum, item) => sum + (item.originalPrice ? (item.originalPrice - item.price) * item.quantity : 0),
    0
  )
  const couponDiscount = appliedCoupon ? (subtotal * appliedCoupon.discount) / 100 : 0
  const shipping = subtotal >= 150 ? 0 : 15.9
  const total = subtotal - couponDiscount + shipping

  return (
    <Card>
      <CardHeader><CardTitle className="text-lg">Resumo do Pedido</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal ({cartItems.reduce((sum, i) => sum + i.quantity, 0)} itens)</span>
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
            <span className="flex items-center gap-1"><Truck className="h-4 w-4" />Frete</span>
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
          <Link href="/checkout"><CreditCard className="h-5 w-5 mr-2" />Finalizar Compra</Link>
        </Button>

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
  )
}
