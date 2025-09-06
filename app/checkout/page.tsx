"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CreditCard, Smartphone, FileText, Truck, User, Lock, Check } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

// Mock cart data for checkout
const cartItems = [
  {
    id: 1,
    name: "Camiseta Oversized Preta",
    price: 89.9,
    image: "/black-oversized-streetwear-t-shirt.jpg",
    size: "M",
    color: "Preto",
    quantity: 2,
  },
  {
    id: 2,
    name: "Hoodie Urban Style",
    price: 159.9,
    image: "/urban-style-hoodie-streetwear.jpg",
    size: "G",
    color: "Cinza",
    quantity: 1,
  },
]

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [shippingMethod, setShippingMethod] = useState("standard")
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderCompleted, setOrderCompleted] = useState(false)

  // Form states
  const [customerInfo, setCustomerInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    cpf: "",
  })

  const [shippingAddress, setShippingAddress] = useState({
    cep: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
  })

  const [billingAddress, setBillingAddress] = useState({
    cep: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
  })

  const [useSameAddress, setUseSameAddress] = useState(true)

  const [cardInfo, setCardInfo] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
    installments: "1",
  })

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingCost = shippingMethod === "express" ? 25.9 : subtotal >= 150 ? 0 : 15.9
  const total = subtotal + shippingCost

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setOrderCompleted(true)
    }, 3000)
  }

  const formatCEP = (value: string) => {
    return value.replace(/\D/g, "").replace(/(\d{5})(\d{3})/, "$1-$2")
  }

  const formatCPF = (value: string) => {
    return value.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
  }

  const formatCardNumber = (value: string) => {
    return value.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1 ")
  }

  const formatExpiry = (value: string) => {
    return value.replace(/\D/g, "").replace(/(\d{2})(\d{2})/, "$1/$2")
  }

  if (orderCompleted) {
    return (
      <div className="min-h-screen">
        <Header 
          onCategoryClick={() => console.log("Category clicked")} 
          onAvatarClick={() => console.log("Avatar clicked")} 
        />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-green-600">Pedido Confirmado!</h1>
              <p className="text-muted-foreground">
                Seu pedido foi processado com sucesso. Você receberá um email de confirmação em breve.
              </p>
            </div>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="font-medium">Número do Pedido:</span>
                    <span className="text-primary font-mono">#SS-2024-001234</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Total Pago:</span>
                    <span className="font-bold text-lg">R$ {total.toFixed(2).replace(".", ",")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Previsão de Entrega:</span>
                    <span>5-7 dias úteis</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/">Continuar Comprando</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/meus-pedidos">Ver Meus Pedidos</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header 
        onCategoryClick={() => console.log("Category clicked")} 
        onAvatarClick={() => console.log("Avatar clicked")} 
      />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/carrinho">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Finalizar Compra</h1>
            <p className="text-muted-foreground">Complete seu pedido de forma segura</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[
              { step: 1, label: "Informações", icon: User },
              { step: 2, label: "Entrega", icon: Truck },
              { step: 3, label: "Pagamento", icon: CreditCard },
            ].map(({ step, label, icon: Icon }) => (
              <div key={step} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-muted-foreground text-muted-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span className={`ml-2 text-sm ${currentStep >= step ? "text-foreground" : "text-muted-foreground"}`}>
                  {label}
                </span>
                {step < 3 && <div className="w-8 h-px bg-border ml-4" />}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Step 1: Customer Information */}
              {currentStep >= 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Informações Pessoais
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="seu@email.com"
                          value={customerInfo.email}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone *</Label>
                        <Input
                          id="phone"
                          placeholder="(11) 99999-9999"
                          value={customerInfo.phone}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Nome *</Label>
                        <Input
                          id="firstName"
                          placeholder="Seu nome"
                          value={customerInfo.firstName}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, firstName: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Sobrenome *</Label>
                        <Input
                          id="lastName"
                          placeholder="Seu sobrenome"
                          value={customerInfo.lastName}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, lastName: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cpf">CPF *</Label>
                      <Input
                        id="cpf"
                        placeholder="000.000.000-00"
                        value={customerInfo.cpf}
                        onChange={(e) =>
                          setCustomerInfo({ ...customerInfo, cpf: formatCPF(e.target.value.slice(0, 14)) })
                        }
                        required
                      />
                    </div>

                    {currentStep === 1 && (
                      <Button type="button" onClick={() => setCurrentStep(2)} className="w-full">
                        Continuar para Entrega
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Shipping Information */}
              {currentStep >= 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="h-5 w-5" />
                      Endereço de Entrega
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
                          onChange={(e) =>
                            setShippingAddress({ ...shippingAddress, cep: formatCEP(e.target.value.slice(0, 9)) })
                          }
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

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="number">Número *</Label>
                        <Input
                          id="number"
                          placeholder="123"
                          value={shippingAddress.number}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, number: e.target.value })}
                          required
                        />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="complement">Complemento</Label>
                        <Input
                          id="complement"
                          placeholder="Apartamento, bloco, etc."
                          value={shippingAddress.complement}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, complement: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="neighborhood">Bairro *</Label>
                        <Input
                          id="neighborhood"
                          placeholder="Seu bairro"
                          value={shippingAddress.neighborhood}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, neighborhood: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">Cidade *</Label>
                        <Input
                          id="city"
                          placeholder="Sua cidade"
                          value={shippingAddress.city}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">Estado *</Label>
                        <Select
                          value={shippingAddress.state}
                          onValueChange={(value) => setShippingAddress({ ...shippingAddress, state: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="SP">São Paulo</SelectItem>
                            <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                            <SelectItem value="MG">Minas Gerais</SelectItem>
                            <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                            <SelectItem value="PR">Paraná</SelectItem>
                            <SelectItem value="SC">Santa Catarina</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Shipping Method */}
                    <div className="space-y-3">
                      <Label>Método de Entrega</Label>
                      <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                        <div className="flex items-center space-x-2 p-3 border rounded-lg">
                          <RadioGroupItem value="standard" id="standard" />
                          <Label htmlFor="standard" className="flex-1 cursor-pointer">
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-medium">Entrega Padrão</div>
                                <div className="text-sm text-muted-foreground">5-7 dias úteis</div>
                              </div>
                              <div className="font-medium">{subtotal >= 150 ? "Grátis" : "R$ 15,90"}</div>
                            </div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 border rounded-lg">
                          <RadioGroupItem value="express" id="express" />
                          <Label htmlFor="express" className="flex-1 cursor-pointer">
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-medium">Entrega Expressa</div>
                                <div className="text-sm text-muted-foreground">2-3 dias úteis</div>
                              </div>
                              <div className="font-medium">R$ 25,90</div>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {currentStep === 2 && (
                      <div className="flex gap-4">
                        <Button type="button" variant="outline" onClick={() => setCurrentStep(1)} className="flex-1">
                          Voltar
                        </Button>
                        <Button type="button" onClick={() => setCurrentStep(3)} className="flex-1">
                          Continuar para Pagamento
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Payment Information */}
              {currentStep >= 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Forma de Pagamento
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="credit-card" id="credit-card" />
                        <Label htmlFor="credit-card" className="flex items-center gap-2 cursor-pointer">
                          <CreditCard className="h-4 w-4" />
                          Cartão de Crédito
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="pix" id="pix" />
                        <Label htmlFor="pix" className="flex items-center gap-2 cursor-pointer">
                          <Smartphone className="h-4 w-4" />
                          PIX (5% de desconto)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="boleto" id="boleto" />
                        <Label htmlFor="boleto" className="flex items-center gap-2 cursor-pointer">
                          <FileText className="h-4 w-4" />
                          Boleto Bancário
                        </Label>
                      </div>
                    </RadioGroup>

                    {paymentMethod === "credit-card" && (
                      <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Número do Cartão *</Label>
                          <Input
                            id="cardNumber"
                            placeholder="0000 0000 0000 0000"
                            value={cardInfo.number}
                            onChange={(e) =>
                              setCardInfo({ ...cardInfo, number: formatCardNumber(e.target.value.slice(0, 19)) })
                            }
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cardName">Nome no Cartão *</Label>
                          <Input
                            id="cardName"
                            placeholder="Nome como está no cartão"
                            value={cardInfo.name}
                            onChange={(e) => setCardInfo({ ...cardInfo, name: e.target.value })}
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Validade *</Label>
                            <Input
                              id="expiry"
                              placeholder="MM/AA"
                              value={cardInfo.expiry}
                              onChange={(e) =>
                                setCardInfo({ ...cardInfo, expiry: formatExpiry(e.target.value.slice(0, 5)) })
                              }
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV *</Label>
                            <Input
                              id="cvv"
                              placeholder="000"
                              value={cardInfo.cvv}
                              onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value.slice(0, 4) })}
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="installments">Parcelas</Label>
                          <Select
                            value={cardInfo.installments}
                            onValueChange={(value) => setCardInfo({ ...cardInfo, installments: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1x de R$ {total.toFixed(2).replace(".", ",")} sem juros</SelectItem>
                              <SelectItem value="2">
                                2x de R$ {(total / 2).toFixed(2).replace(".", ",")} sem juros
                              </SelectItem>
                              <SelectItem value="3">
                                3x de R$ {(total / 3).toFixed(2).replace(".", ",")} sem juros
                              </SelectItem>
                              <SelectItem value="6">
                                6x de R$ {(total / 6).toFixed(2).replace(".", ",")} sem juros
                              </SelectItem>
                              <SelectItem value="12">
                                12x de R$ {(total / 12).toFixed(2).replace(".", ",")} sem juros
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "pix" && (
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="text-center space-y-2">
                          <Smartphone className="h-12 w-12 mx-auto text-primary" />
                          <h3 className="font-medium">Pagamento via PIX</h3>
                          <p className="text-sm text-muted-foreground">
                            Após finalizar o pedido, você receberá o código PIX para pagamento.
                          </p>
                          <Badge className="bg-green-100 text-green-800">5% de desconto</Badge>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "boleto" && (
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="text-center space-y-2">
                          <FileText className="h-12 w-12 mx-auto text-primary" />
                          <h3 className="font-medium">Boleto Bancário</h3>
                          <p className="text-sm text-muted-foreground">
                            O boleto será gerado após a confirmação do pedido. Prazo de pagamento: 3 dias úteis.
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-4">
                      <Button type="button" variant="outline" onClick={() => setCurrentStep(2)} className="flex-1">
                        Voltar
                      </Button>
                      <Button type="submit" className="flex-1" disabled={isProcessing}>
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
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Cart Items */}
                  <div className="space-y-3">
                    {cartItems.map((item) => (
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

                  {/* Totals */}
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

              {/* Security Info */}
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
          </div>
        </form>
      </main>

      <Footer />
    </div>
  )
}
