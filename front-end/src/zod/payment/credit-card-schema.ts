import z from 'zod'

export const creditCardSchema = z.object({
  number: z
    .string()
    .min(19, "Número incompleto")
    .max(19, "Número inválido")
    .regex(/^\d{4} \d{4} \d{4} \d{4}$/, "Formato inválido"),
  name: z.string().min(5, "Nome muito curto").max(50, "Nome muito longo"),
  expiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Formato inválido (MM/AA)"),
  cvv: z.string().min(3, "CVV inválido").max(4, "CVV inválido"),
});

export type CreditCardSchemaType = z.infer<typeof creditCardSchema>
