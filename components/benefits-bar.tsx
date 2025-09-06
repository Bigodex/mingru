import { Truck, Package, CreditCard, RotateCcw } from "lucide-react"

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
    icon: RotateCcw,
    text: "Parcelamos em até 12x",
  },
]


export function BenefitsBar() {
  return (
    <section className="hidden md:block bg-primary/5 py-3 border border-border rounded-[30px] mt-4 mx-24 lg:mx-70 shadow-md">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 text-sm font-medium"
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

