import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

function getPasswordRequirements(password: string): string[] {
  const missing: string[] = [];

  if (!password || password.length < 7) {
    missing.push(`at least 7 characters`);
  }

  const numbers = password?.match(/\d/g)?.length || 0;
  if (numbers < 4) {
    missing.push(`at least 4 numbers`);
  }

  const symbols = password?.match(/[^a-zA-Z0-9]/g)?.length || 0;
  if (symbols < 1) {
    missing.push(`at least 1 symbol`);
  }

  return missing;
}

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
    .string({})
    .refine((password) => {
      const missing = getPasswordRequirements(password);
      return missing.length === 0;
    }, (password) => ({
      message: (() => {
        const missing = getPasswordRequirements(password);
        if (missing.length > 0) {
          return `Password is missing: ${missing.join(', ')}`;
        }
        return "Password must have at least 7 characters, 4 numbers, and 1 symbol";
      })()
    })),
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