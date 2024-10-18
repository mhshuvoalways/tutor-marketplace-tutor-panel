import { z } from "zod";

export const myAccountSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, "Name is required"),
  bio: z
    .string({ required_error: "Bio is required" })
    .min(1, "Bio is required"),
  location: z
    .string({ required_error: "Location is required" })
    .min(1, "Location is required"),
  hourlyRate: z
    .number({ required_error: "Hourly rate is required" })
    .min(1, "Hourly rate is required"),
  grades: z
    .array(z.string({ required_error: "Select at least one grade" }))
    .min(1, "Select at least one grade"),
  subjects: z
    .array(z.string({ required_error: "Select at least one subject" }))
    .min(1, "Select at least one subject"),
  availableOn: z
    .array(z.string({ required_error: "Select at least one available option" }))
    .min(1, "Select at least one available option"),
});
