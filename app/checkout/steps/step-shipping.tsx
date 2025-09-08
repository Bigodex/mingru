import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Truck } from "lucide-react"

export default function StepShipping({ shippingAddress, setShippingAddress, shippingMethod, setShippingMethod, subtotal, setCurrentStep }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="h-5 w-5" /> Endereço de Entrega
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="cep">CEP *</Label>
            <Input
              id="cep"
              placeholder="00000-000"
              value={shippingAddress.cep}
              onChange={(e) => setShippingAddress({ ...shippingAddress, cep: e.target.value })}
              required
            />
          </div>
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="street">Endereço *</Label>
            <Input
              id="street"
              placeholder="Rua, Avenida, etc."
              value={shippingAddress.street}
              onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label>Método de Entrega</Label>
          <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
            <div className="flex items-center space-x-2 p-3 border rounded-lg">
              <RadioGroupItem value="standard" id="standard" />
              <Label htmlFor="standard" className="flex-1 cursor-pointer">
                <div className="flex justify-between items-center">
                  <span>Entrega Padrão</span>
                  <span>{subtotal >= 150 ? "Grátis" : "R$ 15,90"}</span>
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-3 border rounded-lg">
              <RadioGroupItem value="express" id="express" />
              <Label htmlFor="express" className="flex-1 cursor-pointer">
                <div className="flex justify-between items-center">
                  <span>Entrega Expressa</span>
                  <span>R$ 25,90</span>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex gap-4">
          <Button type="button" variant="outline" onClick={() => setCurrentStep(1)} className="flex-1">
            Voltar
          </Button>
          <Button type="button" onClick={() => setCurrentStep(3)} className="flex-1">
            Continuar para Pagamento
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
