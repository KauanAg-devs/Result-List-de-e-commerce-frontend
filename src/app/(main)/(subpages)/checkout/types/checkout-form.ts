export type CheckoutFormProps = {
  paymentStep: 'credit' | 'pix';
  total: number;
  setPaymentStep: React.Dispatch<React.SetStateAction< | 'credit' | 'pix'>>;
  setPixData: React.Dispatch<
    React.SetStateAction<{
      qrCode: string;
      pixKey: string;
      value: number;
    } | null>
  >;
};