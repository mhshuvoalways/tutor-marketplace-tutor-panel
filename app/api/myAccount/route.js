import { authConfig } from "@/app/auth.config";
import cloudinary from "@/app/config/cloudinary";
import AuthModel from "@/app/models/AuthModel";
import TutorProfileModel from "@/app/models/ProfileModel";
import { dbConnect } from "@/app/services/mongodb";
import Cloudinary from "cloudinary";
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
    const obj = {
      ...response._doc,
      email: authResponse.email,
    };
    
    return new NextResponse(JSON.stringify(obj), { status: 200 });
  } catch {
    return new NextResponse(
      JSON.stringify({ message: "Server error occured!" }),
      { status: 500 }
    );
  }
};

export const PUT = async (request) => {
  cloudinary();
  await dbConnect();
  const { auth } = NextAuth(authConfig);
  const session = await auth();
  const email = session.user.email;
  const { public_id, url } = await request.json();
  try {
    const authResponse = await AuthModel.findOne({ email });
    const response = await TutorProfileModel.findOneAndUpdate(
      {
        user: authResponse._id,
      },
      { avatar: { public_id, url } }
    );
    Cloudinary.v2.uploader.destroy(response.avatar.public_id);
    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch {
    return new NextResponse(
      JSON.stringify({ message: "Server error occured!" }),
      { status: 500 }
    );
  }
};
