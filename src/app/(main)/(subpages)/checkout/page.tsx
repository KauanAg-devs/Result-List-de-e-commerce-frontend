"use client";
import { FormProvider } from "react-hook-form";
import { useCheckout } from "./hooks/use-checkout";
import { LoaderCircle } from "lucide-react";
import CheckoutForm from "@checkout/components/checkout-form";
import CreditPayment from "@checkout/components/credit-payment";
import EmptyCart from "@checkout/components/empty-cart";
import OrderResume from "@checkout/components/order-resume";
import PixPayment from "@checkout/components/pix-payment";
import { useRequireAuth } from "@main/hooks/use-require-auth";

export default function Page() {
  const {
    checkoutItems,
    form,
    shipping,
    subtotal,
    tax,
    total,
    pixData,
    setPixData,
    paymentStep,
    setPaymentStep,
    isFromProduct,
    comeFrom,
  } = useCheckout();

  const { loading, isAuthenticated } = useRequireAuth();
  
  if (loading || !isAuthenticated) return <LoaderCircle className="animate-spin mx-auto mt-8" />;
 
  if (checkoutItems.length === 0) return <EmptyCart />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Finalizar Compra</h1>
          <p className="text-gray-600 mt-2">
            {isFromProduct 
              ? "Complete sua compra do produto selecionado" 
              : "Complete seu pedido"
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(async () => {
                setPaymentStep(form.getValues("paymentMethod"));
                console.log({
                  formData: form.getValues(),
                  checkoutItems,
                  comeFrom,
                  isFromProduct,
                  totals: { subtotal, shipping, tax, total }
                });
              })}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <CheckoutForm
                setPaymentStep={setPaymentStep}
                paymentStep={paymentStep}
                setPixData={setPixData}
                total={total}
              />

              {paymentStep === "credit" && <CreditPayment total={total} />}

              {paymentStep === "pix" && pixData && (
                <PixPayment
                  onPixConfirm={() => {
                    alert("Pagamento confirmado!");
                    if (isFromProduct) {
                      console.log("Processando compra direta de produto");
                    } else {
                      console.log("Processando itens do carrinho");
                    }
                  }}
                  total={pixData.value}
                />
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Finalizar Pagamento - R$ {total.toFixed(2)}
              </button>
            </form>
          </FormProvider>

          <OrderResume
            shipping={shipping}
            subtotal={subtotal}
            tax={tax}
            total={total}
          />
        </div>
      </div>
    </div>
  );
}