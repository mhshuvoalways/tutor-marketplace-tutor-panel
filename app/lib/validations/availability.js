import { z } from "zod";

export const availabilityValidation = z.object({
  startedTime: z
    .string({ required_error: "This field is required" })
    .min(1, "This field is required"),
  endedTime: z
    .string({ required_error: "This field is required" })
    .min(1, "This field is required"),
});
