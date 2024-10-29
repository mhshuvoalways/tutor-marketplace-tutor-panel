import { z } from "zod";

export const myAccountSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  gender: z.string().min(1, { message: "Gender is required" }),
  bio: z
    .string()
    .min(1, { message: "Bio is required" })
    .max(2000, { message: "Bio must be 2000 characters or less" }),
  location: z.string().min(1, { message: "Location is required" }),
  hourlyRate: z
    .number()
    .positive({ message: "Hourly rate must be a positive number" })
    .refine(val => val >= 0, { message: "Hourly rate is required" }),
  grades: z
    .array(z.string())
    .min(1, { message: "Select at least one grade" }),
  subjects: z
    .array(z.string())
    .min(1, { message: "Select at least one subject" }),
  availableOn: z
    .array(z.string())
    .min(1, { message: "Select at least one available option" }),
});
