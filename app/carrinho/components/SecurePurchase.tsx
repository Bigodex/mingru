"use client"

import { Card, CardContent } from "@/components/ui/card"

export default function SecurePurchase() {
  return (
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
  )
}
