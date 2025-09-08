import { User, Truck, CreditCard } from "lucide-react"

export default function CheckoutSteps({ currentStep }: { currentStep: number }) {
  const steps = [
    { step: 1, label: "Informações", icon: User },
    { step: 2, label: "Entrega", icon: Truck },
    { step: 3, label: "Pagamento", icon: CreditCard },
  ]

  return (
    <div className="flex items-center justify-center space-x-4">
      {steps.map(({ step, label, icon: Icon }) => (
        <div key={step} className="flex items-center">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              currentStep >= step
                ? "bg-primary border-primary-foreground text-primary-foreground"
                : "border-muted-foreground text-muted-foreground"
            }`}
          >
            <Icon className="h-5 w-5" />
          </div>
          <span
            className={`ml-2 text-sm ${
              currentStep >= step ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            {label}
          </span>
          {step < 3 && <div className="w-8 h-px bg-border ml-4" />}
        </div>
      ))}
    </div>
  )
}
