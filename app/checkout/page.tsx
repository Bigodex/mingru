"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import CheckoutSteps from "./checkout-steps"
import CheckoutForm from "./checkout-form"
import CheckoutSuccess from "./checkout-success"
import OrderSummary from "./order-summary"

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
]

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [shippingMethod, setShippingMethod] = useState("standard")
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderCompleted, setOrderCompleted] = useState(false)

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

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingCost = shippingMethod === "express" ? 25.9 : subtotal >= 150 ? 0 : 15.9
  const total = subtotal + shippingCost

  if (orderCompleted) {
    return <CheckoutSuccess total={total} />
  }

  return (
    <div className="min-h-screen">
      <Header onCategoryClick={() => {}} onAvatarClick={() => {}} />
      <main className="container mx-auto px-4 py-8">
        <CheckoutSteps currentStep={currentStep} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <CheckoutForm
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              shippingMethod={shippingMethod}
              setShippingMethod={setShippingMethod}
              isProcessing={isProcessing}
              setIsProcessing={setIsProcessing}
              setOrderCompleted={setOrderCompleted}
              subtotal={subtotal}
              total={total}
              shippingCost={shippingCost}
              customerInfo={customerInfo}
              setCustomerInfo={setCustomerInfo}
              shippingAddress={shippingAddress}
              setShippingAddress={setShippingAddress}
            />
          </div>
          <div>
            <OrderSummary
              cartItems={cartItems}
              subtotal={subtotal}
              shippingCost={shippingCost}
              total={total}
              paymentMethod={paymentMethod}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
