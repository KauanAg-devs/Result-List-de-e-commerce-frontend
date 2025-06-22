import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useMemo, useEffect, useState } from "react";
import { useCheckoutForm } from "@/zod/checkout-form/checkout-form";

type PixData = {
  qrCode: string;
  pixKey: string;
  value: number;
};

const FREE_SHIPPING_THRESHOLD = 100;
const SHIPPING_COST = 15.0;
const TAX_RATE = 0.08;

export const useCheckout = (): {
  cartItems: RootState["cart"]["items"];
  form: ReturnType<typeof useCheckoutForm>;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  paymentStep: "pix" | "credit";
  setPaymentStep: React.Dispatch<React.SetStateAction<"pix" | "credit">>;
  pixData: PixData | null;
  setPixData: React.Dispatch<React.SetStateAction<PixData | null>>;
} => {
  const [paymentStep, setPaymentStep] = useState<"pix" | "credit">("credit");
  const [pixData, setPixData] = useState<PixData | null>(null);

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const form = useCheckoutForm();

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const shipping = useMemo(() => {
    return subtotal > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  }, [subtotal]);

  const tax = useMemo(() => subtotal * TAX_RATE, [subtotal]);

  const total = useMemo(
    () => subtotal + shipping + tax,
    [subtotal, shipping, tax]
  );

  useEffect(() => {
    if (paymentStep === "pix") {
      setPixData({
        qrCode:
          "00020126360014BR.GOV.BCB.PIX0114+5511999999999520400005303986540529990630460F3",
        pixKey: "pix@loja.com.br",
        value: total,
      });
    }
  }, [paymentStep, total]);

  return {
    cartItems,
    form,
    subtotal,
    shipping,
    tax,
    total,
    paymentStep,
    setPaymentStep,
    pixData,
    setPixData,
  };
};
