import { formSchema } from "@/lib/schemas/create-concert";
import z from "zod";

export type FormValues = z.infer<typeof formSchema>;

export interface CreateConcertFormProps {
  onSuccess?: () => void;
}
