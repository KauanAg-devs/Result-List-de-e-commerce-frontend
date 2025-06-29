import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const authSchema = z.object({
  email: z.object({
    credentialPrivateEmail: z
      .string()
      .email("Invalid email format"),
    publicEmail: z
      .string()
      .email("Invalid public email format")
      .optional(),
  }),
  password: z
    .string()
    .min(7, "Password must be at least 7 characters"),
});

export type AuthSchemaType = z.infer<typeof authSchema>;

export const useAuthForm = () => {
  return useForm<AuthSchemaType>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: {
        credentialPrivateEmail: "",
      },
      password: "",
    },
  });
};
