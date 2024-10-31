import AuthModel from "@/app/models/AuthModel";
import { dbConnect } from "@/app/services/mongodb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    await dbConnect();
    const { email, password } = await request.json();
    const user = await AuthModel.findOne({
      email,
    });
    if (user && user.provider === "credential" && user.role === "tutor") {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        if (user && user.isVerified) {
          return new NextResponse(JSON.stringify(user), { status: 200 });
        } else {
          return new NextResponse(
            JSON.stringify({ message: "Please verify your account!" }),
            {
              status: 400,
            }
          );
        }
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
      JSON.stringify({ message: "Server error occured!" }),
      { status: 500 }
    );
  }
};
