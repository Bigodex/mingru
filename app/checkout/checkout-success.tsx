import { Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CheckoutSuccess({ total }: { total: number }) {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <Check className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-green-600">Pedido Confirmado!</h1>
        <p className="text-muted-foreground">
          Seu pedido foi processado com sucesso. Você receberá um email de confirmação em breve.
        </p>

        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between">
              <span className="font-medium">Número do Pedido:</span>
              <span className="text-primary font-mono">#SS-2024-001234</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Total Pago:</span>
              <span className="font-bold text-lg">
                R$ {total.toFixed(2).replace(".", ",")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Previsão de Entrega:</span>
              <span>5-7 dias úteis</span>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/">Continuar Comprando</Link>
          </Button>
            <Button variant="outline" className="bg-white shadow-sm" asChild>
            <Link href="/meus-pedidos">Ver Meus Pedidos</Link>
            </Button>
        </div>
      </div>
    </main>
  )
}
