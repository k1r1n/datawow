import z from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Concert name must be at least 3 characters" })
    .max(50, { message: "Concert name must be less than 50 characters" }),
  seat: z
    .number()
    .int()
    .min(1, { message: "Must have at least 1 seat" })
    .max(10000, { message: "Cannot exceed 10,000 seats" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(500, { message: "Description must be less than 500 characters" }),
});
