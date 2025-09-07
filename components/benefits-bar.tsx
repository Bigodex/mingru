import { Truck, Package, CreditCard, RotateCcw, Headphones, ShieldCheck } from "lucide-react"

const benefits = [
  {
    icon: Truck,
    text: "Entrega express",
  },
  {
    icon: Package,
    text: "Embalagem ecológica",
  },
  {
    icon: CreditCard,
    text: "Sem juros",
  },
  {
    icon: RotateCcw,
    text: "Parcelamos em até 12x",
  },
  {
    icon: Headphones,
    text: "Suporte 24/7",
  },
]


export function BenefitsBar() {
  return (
    <section className="hidden md:block bg-muted py-10 border border-border rounded-tl-none rounded-tr-none rounded-br-[30px] rounded-bl-[30px] mt-0 mx-6 lg:mx-100 shadow-md">
      <div className="max-w-6xl mx-auto px-6">
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
        {benefits.map((benefit, index) => (
        <div
          key={index}
          className="flex items-center space-x-2 text-sm font-medium"
        >
          <benefit.icon className="h-5 w-5 text-primary" />
          <span>{benefit.text}</span>
        </div>
        ))}
      </div>
      </div>
    </section>
  )
}

