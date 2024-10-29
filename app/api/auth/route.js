import { authConfig } from "@/app/auth.config";
import serverError from "@/app/lib/helpers/serverError";
import AuthModel from "@/app/models/AuthModel";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const { auth } = NextAuth(authConfig);
    const session = await auth();
    const email = session.user.email;
    const { currentPassword, newPassword } = await request.json();
    const user = await AuthModel.findOne({ email });
    if (!user) {
      return new NextResponse(
        JSON.stringify({
          message: "User not found!",
        }),
        { status: 400 }
      );
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return new NextResponse(
        JSON.stringify({
          message: "Current password doesn't match!",
        }),
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await AuthModel.findOneAndUpdate(
      { role: "admin" },
      { password: hashedPassword },
      { new: true }
    );
    return new NextResponse(
      JSON.stringify({
        message: "Password changed successfully!",
      }),
      { status: 200 }
    );
  } catch {
    return serverError();
  }
};
