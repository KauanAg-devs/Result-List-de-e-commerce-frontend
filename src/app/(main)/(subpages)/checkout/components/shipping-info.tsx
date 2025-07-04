"use client";
import { useSelector } from "react-redux";
import { FormSchemaType } from "@/zod/checkout-form/checkout-form";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
import { RootState } from "@/app/store";
export default function ShippingInfo() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<FormSchemaType>();
  const userProfile = useSelector(
    (state: RootState) => state.userProfile.userProfile
  );

  const formatPhone = (value: string) => {
    const nums = value.replace(/\D/g, "");
    if (nums.length === 0) return "";
    if (nums.length <= 2) return `(${nums}`;
    if (nums.length <= 6) return `(${nums.slice(0, 2)}) ${nums.slice(2, 6)}`;
    if (nums.length <= 10)
      return `(${nums.slice(0, 2)}) ${nums.slice(2, 6)}-${nums.slice(6, 10)}`;
    return `(${nums.slice(0, 2)}) ${nums.slice(2, 7)}-${nums.slice(7, 11)}`;
  };

  const formatZipCode = (value: string) => {
    const nums = value.replace(/\D/g, "");
    if (nums.length <= 5) return nums;
    return `${nums.slice(0, 5)}-${nums.slice(5, 8)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setValue("phone", formatted, { shouldValidate: true });
  };

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatZipCode(e.target.value);
    setValue("zipCode", formatted, { shouldValidate: true });
  };

  useEffect(() => {
    if (!userProfile?.name) return;
    setValue("firstName", userProfile.name.split(" ")[0] || "");
    setValue("lastName", userProfile.name.split(" ").slice(1).join(" ") || "");
    setValue("phone", userProfile.phone || "");
  }, [userProfile, setValue]);

  useEffect(() => {
    const address = userProfile?.UserAddresses?.[0];
    if (!address) return;

    setValue("address", address.address || "");
    setValue("city", address.city || "");
    setValue("state", address.state || "");
    setValue("zipCode", address.zipCode || "");
  }, [userProfile, setValue]);


  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Endereço de Entrega
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome
          </label>
          <input
            type="text"
            {...register("firstName")}
            className={`w-full px-3 py-2 border ${
              errors.firstName ? "border-red-500" : "border-gray-300"
            } text-zinc-700 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent`}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sobrenome
          </label>
          <input
            type="text"
            {...register("lastName")}
            className={`w-full px-3 py-2 border ${
              errors.lastName ? "border-red-500" : "border-gray-300"
            } text-zinc-700 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent`}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Endereço
        </label>
        <input
          type="text"
          {...register("address")}
          className={`w-full px-3 py-2 border ${
            errors.address ? "border-red-500" : "border-gray-300"
          } text-zinc-700 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent`}
          placeholder="Rua, número"
        />
        {errors.address && (
          <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cidade
          </label>
          <input
            type="text"
            {...register("city")}
            className={`w-full px-3 py-2 border ${
              errors.city ? "border-red-500" : "border-gray-300"
            } text-zinc-700 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent`}
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estado
          </label>
          <select
            {...register("state")}
            className={`w-full px-3 py-2 border ${
              errors.state ? "border-red-500" : "border-gray-300"
            } text-zinc-700 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent`}
          >
            <option value="">Selecione</option>
            <option value="SP">São Paulo</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="MG">Minas Gerais</option>
            <option value="RS">Rio Grande do Sul</option>
          </select>
          {errors.state && (
            <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CEP
          </label>
          <input
            type="text"
            {...register("zipCode")}
            value={watch("zipCode")}
            onChange={handleZipCodeChange}
            className={`w-full px-3 py-2 border ${
              errors.zipCode ? "border-red-500" : "border-gray-300"
            } text-zinc-700 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent`}
            placeholder="00000-000"
          />
          {errors.zipCode && (
            <p className="text-red-500 text-sm mt-1">
              {errors.zipCode.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Telefone
        </label>
        <input
          type="tel"
          {...register("phone")}
          value={watch("phone")}
          onChange={handlePhoneChange}
          className={`w-full px-3 py-2 border ${
            errors.phone ? "border-red-500" : "border-gray-300"
          } text-zinc-700 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent`}
          placeholder="(00) 00000-0000"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
        )}
      </div>
    </div>
  );
}
