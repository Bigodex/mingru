import StepCustomerInfo from "./steps/step-customer-info"
import StepShipping from "./steps/step-shipping"
import StepPayment from "./steps/step-payment"

export default function CheckoutForm(props: any) {
  const { currentStep } = props

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
      {currentStep === 1 && <StepCustomerInfo {...props} />}
      {currentStep === 2 && <StepShipping {...props} />}
      {currentStep === 3 && <StepPayment {...props} />}
    </form>
  )
}
