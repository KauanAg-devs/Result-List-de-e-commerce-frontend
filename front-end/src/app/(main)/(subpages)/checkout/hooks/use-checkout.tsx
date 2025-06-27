import { RootState } from "@/app/store";
import { useSelector, useDispatch } from "react-redux";
import { useMemo, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation"; 
import { useCheckoutForm } from "@/zod/checkout-form/checkout-form";
import { resetCheckout } from "@/app/store/checkout-slice"; 

type PixData = {
  qrCode: string;
  pixKey: string;
  value: number;
};

const FREE_SHIPPING_THRESHOLD = 100;
const SHIPPING_COST = 15.0;
const TAX_RATE = 0.08;

export const useCheckout = (): {
  checkoutState: RootState["checkout"];
  cartItems: RootState["cart"]["items"];
  checkoutItems: any[]; 
  form: ReturnType<typeof useCheckoutForm>;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  paymentStep: "pix" | "credit";
  setPaymentStep: React.Dispatch<React.SetStateAction<"pix" | "credit">>;
  pixData: PixData | null;
  setPixData: React.Dispatch<React.SetStateAction<PixData | null>>;
  isFromProduct: boolean;
  comeFrom: "cart" | "product";
} => {
  const [paymentStep, setPaymentStep] = useState<"pix" | "credit">("credit");
  const [pixData, setPixData] = useState<PixData | null>(null);
  const [previousPath, setPreviousPath] = useState<string>("");
  const dispatch = useDispatch();
  const pathname = usePathname();

  const checkoutState = useSelector((state: RootState) => state.checkout);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { comeFrom, selectedProduct } = checkoutState;
  const isFromProduct = comeFrom === "product";
  const form = useCheckoutForm();

  const checkoutItems = useMemo(() => {
    if (isFromProduct && selectedProduct) {
      return [{
        ...selectedProduct,
        quantity: 1
      }];
    } else {
      return cartItems;
    }
  }, [isFromProduct, selectedProduct, cartItems]);

  const subtotal = useMemo(() => {
    return checkoutItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [checkoutItems]);

  const shipping = useMemo(() => {
    return subtotal > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  }, [subtotal]);

  const tax = useMemo(() => subtotal * TAX_RATE, [subtotal]);

  const total = useMemo(
    () => subtotal + shipping + tax,
    [subtotal, shipping, tax]
  );

  useEffect(() => {
    if (previousPath && previousPath.includes('/checkout') && !pathname.includes('/checkout')) {
      if (comeFrom === 'product') {
        dispatch(resetCheckout());
      }
    }
    setPreviousPath(pathname);
  }, [pathname, dispatch, comeFrom, previousPath]);

 

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (comeFrom === 'product') {
        dispatch(resetCheckout());
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [dispatch, comeFrom]);

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
    checkoutState,
    cartItems,
    checkoutItems, 
    form,
    subtotal,
    shipping,
    tax,
    total,
    paymentStep,
    setPaymentStep,
    pixData,
    setPixData,
    isFromProduct,
    comeFrom, 
  };
};
