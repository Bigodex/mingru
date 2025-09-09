"use client";

import { User, Truck, CreditCard } from "lucide-react";

type StepDef = { step: number; label: string; icon: React.ComponentType<React.SVGProps<SVGSVGElement>> };

type Props = {
  currentStep: number;
  onStepChange?: (step: number) => void; // opcional: torna os passos clicáveis
  steps?: StepDef[]; // opcional: permite customizar
};

export default function CheckoutSteps({
  currentStep,
  onStepChange,
  steps = [
    { step: 1, label: "Informações", icon: User },
    { step: 2, label: "Entrega", icon: Truck },
    { step: 3, label: "Pagamento", icon: CreditCard },
  ],
}: Props) {
  return (
    <nav aria-label="Progresso do checkout" className="w-full">
      <ol className="flex items-center justify-center flex-wrap gap-3 sm:gap-4">
        {steps.map(({ step, label, icon: Icon }, idx) => {
          const isDone = currentStep > step;
          const isCurrent = currentStep === step;

          const circleBase =
            "flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 transition-colors";
          const circleState = isDone
            ? "bg-primary border-primary text-primary-foreground"
            : isCurrent
            ? "border-primary text-primary ring-2 ring-primary/30"
            : "border-muted-foreground/40 text-muted-foreground";

          const labelBase = "ml-2 text-xs sm:text-sm truncate hidden sm:inline";
          const labelState = isDone || isCurrent ? "text-foreground" : "text-muted-foreground";

          const Connector = (
            <div
              aria-hidden
              className={`h-0.5 w-8 sm:w-10 mx-3 ${currentStep > step ? "bg-primary" : "bg-border"}`}
            />
          );

          const Content = (
            <>
              <div className={`${circleBase} ${circleState}`}>
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <span className={`${labelBase} ${labelState}`} aria-current={isCurrent ? "step" : undefined}>
                {label}
              </span>
            </>
          );

          return (
            <li key={step} className="flex items-center">
              {onStepChange ? (
                <button
                  type="button"
                  onClick={() => onStepChange(step)}
                  className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-full"
                >
                  {Content}
                </button>
              ) : (
                <div className="flex items-center">{Content}</div>
              )}

              {/* Conector entre passos */}
              {idx < steps.length - 1 && Connector}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
