import { FormSchemaType } from "@/zod/form/form-schema";
import { useFormContext } from "react-hook-form";

export default function ChoosePaymentMethod({ setPaymentStep }: {
  setPaymentStep: React.Dispatch<
    React.SetStateAction<"pix" | "credit">
  >;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormSchemaType>();

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Método de Pagamento
      </h2>
      <div className="space-y-3">
          <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              value="credit"
              {...register("paymentMethod")}
              onClick={() => setPaymentStep("credit")}
              className="mr-3"
            />
            <div className="flex items-center">
              <svg
                className="w-8 h-8 text-blue-600 mr-3"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 4v8h16V8H4zm2 2h6v2H6v-2z" />
              </svg>
              <span className="font-medium text-zinc-400">Cartão de Crédito</span>
            </div>
          </label>
        <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            value="pix"
            {...register("paymentMethod")}
            onClick={() => setPaymentStep("pix")}
            className="mr-3"
          />
          <div className="flex items-center">
            <svg
              className="w-8 h-8 text-green-600 mr-3"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="font-medium text-zinc-400">PIX</span>
          </div>
        </label>
      </div>
    </div>
  );
}
