import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const formSchema = z
  .object({
    email: z.string().email(),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    address: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    zipCode: z.string().min(1),
    phone: z.string().min(1),

    paymentMethod: z.enum(["credit", "pix"]),

    cardNumber: z.string().optional(),
    nameOnCard: z.string().optional(),
    expirationDate: z.string().optional(),
    cvv: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.paymentMethod === "credit") {
      if (!data.cardNumber || data.cardNumber.length < 16) {
        console.log("valor:", data.cardNumber);

        ctx.addIssue({
          path: ["cardNumber"],
          code: z.ZodIssueCode.custom,
          message: "Número do cartão inválido",
        });
      }
      if (!data.nameOnCard) {
        ctx.addIssue({
          path: ["nameOnCard"],
          code: z.ZodIssueCode.custom,
          message: "Nome no cartão obrigatório",
        });
      }
      if (!data.expirationDate) {
        ctx.addIssue({
          path: ["expirationDate"],
          code: z.ZodIssueCode.custom,
          message: "Data de expiração obrigatória",
        });
      }
      if (!data.cvv || data.cvv.length < 3) {
        ctx.addIssue({
          path: ["cvv"],
          code: z.ZodIssueCode.custom,
          message: "CVV inválido",
        });
      }
    }
  });

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

export type FormSchemaType = z.infer<typeof formSchema>;
