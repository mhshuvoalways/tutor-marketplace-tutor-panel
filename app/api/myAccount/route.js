import { authConfig } from "@/app/auth.config";
import AuthModel from "@/app/models/AuthModel";
import TutorProfileModel from "@/app/models/ProfileModel";
import { dbConnect } from "@/app/services/mongodb";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  await dbConnect();
  const { auth } = NextAuth(authConfig);
  const session = await auth();
  const email = session.user.email;
  const { name, bio, location, hourlyRate, grades, subjects, availableOn } =
    await request.json();
  try {
    const profileObj = {
      name,
      bio,
      location,
      hourlyRate,
      grades,
      subjects,
      availableOn,
    };
    const authResponse = await AuthModel.findOne({ email });
    const response = await TutorProfileModel.findOneAndUpdate(
      {
        user: authResponse._id,
      },
      profileObj,
      { new: true }
    );
    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch {
    return new NextResponse(
      JSON.stringify({ message: "Server error occured!" }),
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    await dbConnect();
    const { auth } = NextAuth(authConfig);
    const session = await auth();
    const email = session.user.email;

    const authResponse = await AuthModel.findOne({ email });
    const response = await TutorProfileModel.findOne({
      user: authResponse._id,
    })
      .populate("grades")
      .populate("subjects");
    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch {
    return new NextResponse(
      JSON.stringify({ message: "Server error occured!" }),
      { status: 500 }
    );
  }
};
