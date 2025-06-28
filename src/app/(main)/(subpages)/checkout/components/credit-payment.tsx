"use client";

import { ChildrenProps } from "@/types/children";
import { useFormContext } from "react-hook-form";

export default function CreditPayment({ total }: { total: number }) {

  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  const cardNumber = watch("cardNumber");
  const expirationDate = watch("expirationDate");

  const formatCardNumber = (value: string) => {
    const nums = value.replace(/\D/g, "");
    return nums.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const formatExpiry = (value: string) => {
    const nums = value.replace(/\D/g, "");
    if (nums.length > 2) return `${nums.slice(0, 2)}/${nums.slice(2, 4)}`;
    return nums;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("cardNumber", formatCardNumber(e.target.value));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("expirationDate", formatExpiry(e.target.value));
  };

  return (
    <div className="mt-6 p-6 bg-white border rounded-lg">
      <h3 className="text-lg font-semibold text-zinc-700 mb-4">
        Dados do Cartão
      </h3>
      <div className="space-y-4">
        <div>
          <input
            type="text"
            {...register("cardNumber")}
            value={cardNumber || ""}
            onChange={handleCardNumberChange}
            className={`w-full text-zinc-700 p-3 border ${
              errors.cardNumber ? "border-red-500" : "border-gray-300"
            } rounded-lg`}
            placeholder="Número do cartão"
            maxLength={19}
          />
          {errors.cardNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.cardNumber.message as ChildrenProps['children']}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            {...register("nameOnCard")}
            className={`w-full text-zinc-700 p-3 border ${
              errors.nameOnCard ? "border-red-500" : "border-gray-300"
            } rounded-lg`}
            placeholder="Nome no cartão"
          />
          {errors.nameOnCard && (
            <p className="text-red-500 text-sm mt-1">{errors.nameOnCard.message as ChildrenProps['children']}</p>
          )}
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              {...register("expiry")}
              value={expirationDate || ""}
              onChange={handleExpiryChange}
              className={`w-full text-zinc-700 p-3 border ${
                errors.expiry ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
              placeholder="MM/AA"
              maxLength={5}
            />
            {errors.expiry && (
              <p className="text-red-500 text-sm mt-1">
                {errors.expiry.message as ChildrenProps['children']}
              </p>
            )}
          </div>

          <div className="flex-1">
            <input
              type="text"
              {...register("cvv")}
              className={`w-full text-zinc-700 p-3 border ${
                errors.cvv ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
              placeholder="CVV"
              maxLength={4}
            />
            {errors.cvv && (
              <p className="text-red-500 text-sm mt-1">{errors.cvv.message as ChildrenProps['children']}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
