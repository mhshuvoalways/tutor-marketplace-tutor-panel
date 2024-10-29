import { dbConnect } from "@/app/services/mongodb";
import recoverPass from "@/app/lib/mail/template";
import AuthModel from "@/app/models/AuthModel";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_KEY);

export const POST = async (request) => {
  try {
    await dbConnect();
    const { email } = await request.json();
    const user = await AuthModel.findOne({ email });
    if (!user || user.provider === "google") {
      return new NextResponse(
        JSON.stringify({
          message: "User not found!",
        }),
        { status: 400 }
      );
    }
    const token = jwt.sign(
      {
        _id: user._id,
        email,
      },
      process.env.AUTH_SECRET,
      { expiresIn: "30m" }
    );
    await resend.emails.send({
      from: "Tutor marketplace <noreply@mhshuvo.com>",
      to: email,
      subject: "Change Your Password",
      react: recoverPass(token),
    });
    return new NextResponse(
      JSON.stringify({
        message:
          "Email sent successfully! Please check your email to recover your password!",
      }),
      { status: 200 }
    );
  } catch {
    return new NextResponse(
      JSON.stringify({ message: "Server error occured!" }),
      { status: 500 }
    );
  }
};
