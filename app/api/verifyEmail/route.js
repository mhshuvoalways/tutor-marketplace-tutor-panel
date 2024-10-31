import { dbConnect } from "@/app/services/mongodb";
import AuthModel from "@/app/models/AuthModel";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { token } = await request.json();
  try {
    const result = await jwt.verify(token, process.env.AUTH_SECRET);
    try {
      await dbConnect();
      const authRes = await AuthModel.findOneAndUpdate(
        { _id: result._id },
        { isVerified: true },
        { new: true }
      );
      return new NextResponse(JSON.stringify(authRes), { status: 200 });
    } catch {
      return new NextResponse(
        JSON.stringify({ message: "User already exit!" }),
        {
          status: 400,
        }
      );
    }
  } catch {
    return new NextResponse(JSON.stringify({ message: "User already exit!" }), {
      status: 400,
    });
  }
};
