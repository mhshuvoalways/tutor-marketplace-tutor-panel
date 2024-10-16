"use server";

import { signIn, signOut } from "@/app/auth";

export async function credentialLogin(formData) {
  await signIn("credentials", {
    email: formData.email,
    password: formData.password,
    redirectTo: "/",
  });
}

export async function socialLogin(formData) {
  await signIn(formData, { redirectTo: "/" });
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}
