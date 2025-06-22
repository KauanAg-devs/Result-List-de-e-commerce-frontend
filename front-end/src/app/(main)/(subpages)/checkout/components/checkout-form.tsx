import { CheckoutFormProps } from "@checkout/types/checkout-form";
import { ContactInfo } from "@checkout/components/contact-info";
import ShippingInfo from "@checkout/components/shipping-info";
import ChoosePaymentMethod from "@checkout/components/choose-payment-method";

export default function CheckoutForm({
  setPaymentStep,
}: CheckoutFormProps) {

  return (
      <div className="space-y-6">
        <ContactInfo />
        <ShippingInfo />
        <ChoosePaymentMethod setPaymentStep={setPaymentStep} />
      </div>
  );
}
