"use client"

import { Trash2 } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Props {
  couponCode: string
  setCouponCode: (v: string) => void
  appliedCoupon: { code: string; discount: number } | null
  setAppliedCoupon: (c: { code: string; discount: number } | null) => void
}

export default function CouponForm({ couponCode, setCouponCode, appliedCoupon, setAppliedCoupon }: Props) {
  const validCoupons = { DESCONTO10: 10, PRIMEIRA15: 15, FRETE20: 20 }

  const applyCoupon = () => {
    const discount = validCoupons[couponCode.toUpperCase() as keyof typeof validCoupons]
    if (discount) {
      setAppliedCoupon({ code: couponCode.toUpperCase(), discount })
      setCouponCode("")
    } else {
      alert("Cupom inválido")
    }
  }

  return (
    <Card>
      <CardHeader><CardTitle className="text-lg">Cupom de Desconto</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        {appliedCoupon ? (
          <div className="flex items-center justify-between p-3 bg-green-50 border rounded-lg">
            <div>
              <div className="font-medium text-green-800">{appliedCoupon.code}</div>
              <div className="text-sm text-green-600">{appliedCoupon.discount}% de desconto aplicado</div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setAppliedCoupon(null)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="coupon">Código do cupom</Label>
            <div className="flex gap-2">
              <Input id="coupon" value={couponCode} placeholder="Digite o código"
                onChange={(e) => setCouponCode(e.target.value)} />
              <Button onClick={applyCoupon} disabled={!couponCode.trim()}>Aplicar</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
