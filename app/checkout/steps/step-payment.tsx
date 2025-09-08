import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, Smartphone, FileText, Lock } from "lucide-react"

export default function StepPayment({ paymentMethod, setPaymentMethod, isProcessing, setIsProcessing, setOrderCompleted, setCurrentStep, total }: any) {
  const handleSubmit = async () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setOrderCompleted(true)
    }, 3000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" /> Forma de Pagamento
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
          <div className="flex items-center space-x-2 p-3 border rounded-lg">
            <RadioGroupItem value="credit-card" id="credit-card" />
            <Label htmlFor="credit-card" className="flex items-center gap-2 cursor-pointer">
              <CreditCard className="h-4 w-4" /> Cartão de Crédito
            </Label>
          </div>
          <div className="flex items-center space-x-2 p-3 border rounded-lg">
            <RadioGroupItem value="pix" id="pix" />
            <Label htmlFor="pix" className="flex items-center gap-2 cursor-pointer">
              <Smartphone className="h-4 w-4" /> PIX (5% de desconto)
            </Label>
          </div>
          <div className="flex items-center space-x-2 p-3 border rounded-lg">
            <RadioGroupItem value="boleto" id="boleto" />
            <Label htmlFor="boleto" className="flex items-center gap-2 cursor-pointer">
              <FileText className="h-4 w-4" /> Boleto Bancário
            </Label>
          </div>
        </RadioGroup>

        <div className="flex gap-4">
          <Button type="button" variant="outline" onClick={() => setCurrentStep(2)} className="flex-1">
            Voltar
          </Button>
          <Button
            type="button"
            className="flex-1"
            disabled={isProcessing}
            onClick={handleSubmit}
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processando...
              </div>
            ) : (
              <>
                <Lock className="h-4 w-4 mr-2" />
                Finalizar Pedido
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
