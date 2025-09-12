"use client";

import { useMemo, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import {
  CreditCard as CreditCardIcon,
  Smartphone,
  FileText,
  Lock,
} from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

type PaymentMethod = "credit-card" | "pix" | "boleto";

type Props = {
  paymentMethod: PaymentMethod;
  setPaymentMethod: (v: PaymentMethod) => void;
  isProcessing: boolean;
  setIsProcessing: (v: boolean) => void;
  setOrderCompleted: (v: boolean) => void;
  setCurrentStep: (n: number) => void;
  total: number;
};

export default function StepPayment({
  paymentMethod,
  setPaymentMethod,
  isProcessing,
  setIsProcessing,
  setOrderCompleted,
  setCurrentStep,
  total,
}: Props) {
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
    installments: "1",
  });

  const [pixKey] = useState("flowstry-pix-chave-aleatoria-123");
  const [boletoData, setBoletoData] = useState({ cpf: "", email: "" });

  const totalPix = useMemo(() => Math.round(total * 0.95 * 100) / 100, [total]);

  const handleSubmit = async () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrderCompleted(true);
    }, 3000);
  };

  const triggerChevronClasses =
    "group w-full px-3 py-3 [&>svg]:rotate-180 hover:[&>svg]:rotate-0 [&>svg]:transition-transform [&>svg]:duration-200";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCardIcon className="h-5 w-5" /> Forma de Pagamento
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <RadioGroup
          value={paymentMethod}
          onValueChange={(v) => setPaymentMethod(v as PaymentMethod)}
          className="space-y-3"
        >
          <Accordion type="single" collapsible className="w-full">
            {/* Cartão de Crédito */}
            <AccordionItem value="credit-card" className="border rounded-lg">
              <AccordionTrigger className={triggerChevronClasses}>
                <div className="w-full flex items-center gap-2">
                  <RadioGroupItem value="credit-card" id="credit-card" />
                  <Label
                    htmlFor="credit-card"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <CreditCardIcon className="h-4 w-4" />
                    Cartão de Crédito
                  </Label>
                </div>
              </AccordionTrigger>

              {paymentMethod === "credit-card" && (
                <AccordionContent className="px-3 pb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cc-number">Número do cartão</Label>
                      <Input
                        id="cc-number"
                        inputMode="numeric"
                        placeholder="0000 0000 0000 0000"
                        value={cardData.number}
                        onChange={(e) =>
                          setCardData((p) => ({ ...p, number: e.target.value }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cc-name">Nome impresso</Label>
                      <Input
                        id="cc-name"
                        placeholder="Como está no cartão"
                        value={cardData.name}
                        onChange={(e) =>
                          setCardData((p) => ({ ...p, name: e.target.value }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cc-expiry">Validade (MM/AA)</Label>
                      <Input
                        id="cc-expiry"
                        placeholder="MM/AA"
                        value={cardData.expiry}
                        onChange={(e) =>
                          setCardData((p) => ({ ...p, expiry: e.target.value }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cc-cvv">CVV</Label>
                      <Input
                        id="cc-cvv"
                        inputMode="numeric"
                        placeholder="***"
                        value={cardData.cvv}
                        onChange={(e) =>
                          setCardData((p) => ({ ...p, cvv: e.target.value }))
                        }
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="cc-installments">Parcelas</Label>
                      <select
                        id="cc-installments"
                        className="w-full border rounded-md h-10 px-3 bg-background"
                        value={cardData.installments}
                        onChange={(e) =>
                          setCardData((p) => ({
                            ...p,
                            installments: e.target.value,
                          }))
                        }
                      >
                        {Array.from({ length: 12 }).map((_, i) => (
                          <option key={i + 1} value={String(i + 1)}>
                            {i + 1}x de R${" "}
                            {(total / (i + 1)).toFixed(2).replace(".", ",")}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </AccordionContent>
              )}
            </AccordionItem>

            {/* PIX */}
            <AccordionItem value="pix" className="border rounded-lg">
              <AccordionTrigger className={triggerChevronClasses}>
                <div className="w-full flex items-center gap-2">
                  <RadioGroupItem value="pix" id="pix" />
                  <Label
                    htmlFor="pix"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Smartphone className="h-4 w-4" /> PIX (5% de desconto)
                  </Label>
                </div>
              </AccordionTrigger>

              {paymentMethod === "pix" && (
                <AccordionContent className="px-3 pb-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Valor com desconto:{" "}
                        <span className="font-medium text-foreground">
                          R$ {totalPix.toFixed(2).replace(".", ",")}
                        </span>{" "}
                        (de R$ {total.toFixed(2).replace(".", ",")})
                      </p>
                      <div className="rounded-lg border p-3 bg-muted/30">
                        <Label>Copia e Cola (chave PIX)</Label>
                        <div className="mt-1 flex gap-2">
                          <Input readOnly value={pixKey} />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                              navigator.clipboard.writeText(pixKey)
                            }
                          >
                            Copiar
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-center">
                      <div className="aspect-square w-40 rounded-md border grid place-items-center">
                        <div className="text-xs text-muted-foreground">
                          QR Code PIX
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              )}
            </AccordionItem>

            {/* Boleto */}
            <AccordionItem value="boleto" className="border rounded-lg">
              <AccordionTrigger className={triggerChevronClasses}>
                <div className="w-full flex items-center gap-2">
                  <RadioGroupItem value="boleto" id="boleto" />
                  <Label
                    htmlFor="boleto"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <FileText className="h-4 w-4" /> Boleto Bancário
                  </Label>
                </div>
              </AccordionTrigger>

              {paymentMethod === "boleto" && (
                <AccordionContent className="px-3 pb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="boleto-cpf">CPF do pagador</Label>
                      <Input
                        id="boleto-cpf"
                        placeholder="000.000.000-00"
                        value={boletoData.cpf}
                        onChange={(e) =>
                          setBoletoData((p) => ({ ...p, cpf: e.target.value }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="boleto-email">E-mail para envio</Label>
                      <Input
                        id="boleto-email"
                        type="email"
                        placeholder="seu@email.com"
                        value={boletoData.email}
                        onChange={(e) =>
                          setBoletoData((p) => ({ ...p, email: e.target.value }))
                        }
                      />
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm text-muted-foreground">
                        O boleto será gerado com vencimento em 2 dias úteis. O
                        pedido é liberado após a compensação.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              )}
            </AccordionItem>
          </Accordion>
        </RadioGroup>

        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setCurrentStep(2)}
            className="flex-1"
          >
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
  );
}
