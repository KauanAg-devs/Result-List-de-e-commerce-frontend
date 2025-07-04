import { RootState } from "@/app/store";
import { FormSchemaType } from "@/zod/checkout-form/checkout-form";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";

export function ContactInfo() {
  const {
    register,
    formState: { errors },
    setValue
  } = useFormContext<FormSchemaType>();
  const userProfile = useSelector((state: RootState) => state.userProfile.userProfile)

  useEffect(() => {
    if (userProfile?.email?.credentialPrivateEmail) {
      setValue("email", userProfile.email.credentialPrivateEmail);
    }
  }, [userProfile, setValue]);

  
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Informações de Contato
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className={`w-full text-zinc-700 px-3 py-2 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent`}
            placeholder="seu@email.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
