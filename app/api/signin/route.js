import { signInSchema } from "@/app/lib/validations/auth";
import AuthModel from "@/app/models/AuthModel";
import { dbConnect } from "@/app/services/mongodb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    await dbConnect();
    const { email, password } = await signInSchema.parseAsync(
      await request.json()
    );
    try {
      const user = await AuthModel.findOne({
        email,
      });
      if (user && user.provider === "credential") {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          return new NextResponse(JSON.stringify(user), { status: 200 });
        } else {
          return new NextResponse(
            JSON.stringify({ message: "Email or Password is not correct" }),
            {
              status: 400,
            }
          );
        }
      } else {
        return new NextResponse(JSON.stringify({ message: "User not found" }), {
          status: 400,
        });
      }
    } catch {
      return new NextResponse(
        JSON.stringify({ message: "Server error occured" }),
        {
          status: 500,
        }
      );
    }
  } catch (errors) {
    const formattedErrors = errors.issues.reduce((acc, error) => {
      acc[error.path[0]] = error.message;
      return acc;
    }, {});
    return new NextResponse(JSON.stringify(formattedErrors), { status: 400 });
  }
};
