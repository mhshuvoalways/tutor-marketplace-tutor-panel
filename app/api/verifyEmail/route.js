import { dbConnect } from "@/db/mongodb";
import AuthModel from "@/models/AuthModel";
import serverError from "@/services/serverError";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { token } = await request.json();
  console.log(token);
  
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
      return serverError();
    }
  } catch {
    return serverError();
  }
};
