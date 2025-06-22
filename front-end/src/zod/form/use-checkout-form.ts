import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormSchemaType, formSchema } from "./form-schema";

export const useCheckoutForm = () => {
  return useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
      paymentMethod: "credit",

      cardNumber: "",
      nameOnCard: "",
      expirationDate: "",
      cvv: "",
    },
  });
};
