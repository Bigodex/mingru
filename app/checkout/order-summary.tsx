import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Lock } from "lucide-react"

export default function OrderSummary({ cartItems, subtotal, shippingCost, total, paymentMethod }: any) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Resumo do Pedido</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {cartItems.map((item: any) => (
              <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-3">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1 space-y-1">
                  <h4 className="font-medium text-sm">{item.name}</h4>
                  <div className="text-xs text-muted-foreground">
                    {item.size} • {item.color} • Qtd: {item.quantity}
                  </div>
                  <div className="font-medium text-sm">
                    R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>R$ {subtotal.toFixed(2).replace(".", ",")}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Frete</span>
              <span>{shippingCost === 0 ? "Grátis" : `R$ ${shippingCost.toFixed(2).replace(".", ",")}`}</span>
            </div>
            {paymentMethod === "pix" && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Desconto PIX (5%)</span>
                <span>-R$ {(subtotal * 0.05).toFixed(2).replace(".", ",")}</span>
              </div>
            )}
          </div>

          <Separator />

          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span className="text-primary">
              R${" "}
              {paymentMethod === "pix"
                ? (total - subtotal * 0.05).toFixed(2).replace(".", ",")
                : total.toFixed(2).replace(".", ",")}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Lock className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <div className="font-medium">Compra 100% Segura</div>
              <div className="text-muted-foreground">SSL 256 bits</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
