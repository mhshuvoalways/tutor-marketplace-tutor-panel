import { authConfig } from "@/app/auth.config";
import AuthModel from "@/app/models/AuthModel";
import ProfileModel from "@/app/models/ProfileModel";
import { dbConnect } from "@/app/services/mongodb";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";

export const PUT = async (request) => {
  const { mySession } = await request.json();
  try {
    await dbConnect();
    const { auth } = NextAuth(authConfig);
    const session = await auth();
    const email = session.user.email;
    const findUser = await AuthModel.findOne({ email });
    if (findUser) {
      await ProfileModel.findOneAndUpdate(
        { user: findUser._id },
        { session: mySession }
      );
      return new NextResponse(JSON.stringify("Updated!"), { status: 200 });
    }
  } catch {
    return new NextResponse(
      JSON.stringify({ message: "Server error occured!" }),
      { status: 500 }
    );
  }
};
