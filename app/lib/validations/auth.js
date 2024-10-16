import { object, string } from "zod";

export const signUpSchema = object({
  name: string({ required_error: "Name is required" }).min(
    1,
    "Name is required"
  ),
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const passwordChangeSchema = object({
  currentPassword: string({ required_error: "Current password is required" })
    .min(1, "Current password is required")
    .min(8, "Current password must be more than 8 characters")
    .max(32, "Current password must be less than 32 characters"),
  newPassword: string({ required_error: "New password is required" })
    .min(1, "New password is required")
    .min(8, "New password must be more than 8 characters")
    .max(32, "New password must be less than 32 characters"),
  confirmPassword: string({ required_error: "Confirm password is required" })
    .min(1, "Confirm password is required")
    .min(8, "Confirm password must be more than 8 characters")
    .max(32, "Confirm password must be less than 32 characters"),
});
