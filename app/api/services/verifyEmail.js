import verifyEmailTemplate from "@/app/lib/mail/verifyEmailTemplate";
import jwt from "jsonwebtoken";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_KEY);

export const verifyEmail = async ({ name, user: userId, email }) => {
  const token = jwt.sign(
    {
      _id: userId,
      email,
    },
    process.env.AUTH_SECRET,
    { expiresIn: "30m" }
  );
  await resend.emails.send({
    from: "Tim's Tutor <noreply@mhshuvo.com>",
    to: email,
    subject: "Verify Your Email to Activate Your Account 🚀",
    react: verifyEmailTemplate(name, token),
  });
};
