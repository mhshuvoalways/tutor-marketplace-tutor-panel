import { z } from "zod";

export const myAccountSchema = z.object({
  name: z.string().min(1, "Name is required"),
  bio: z.string().min(1, "Bio is required"),
  location: z.string().min(1, "Location is required"),
  hourlyRate: z.number().min(1, "Hourly rate is required"),
  grades: z.array(z.string()).min(1, "Select at least one grade"),
  subjects: z.array(z.string()).min(1, "Select at least one subject"),
  availableOn: z.array(z.string()).min(1, "Select at least one available option"),
});
