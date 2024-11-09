import { authConfig } from "@/app/auth.config";
import cloudinary from "@/app/config/cloudinary";
import AuthModel from "@/app/models/AuthModel";
import "@/app/models/GradeModel";
import TutorProfileModel from "@/app/models/ProfileModel";
import "@/app/models/SubjectModel";
import { dbConnect } from "@/app/services/mongodb";
import Cloudinary from "cloudinary";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    await dbConnect();
    const { auth } = NextAuth(authConfig);
    const session = await auth();
    const email = session.user.email;
    const {
      name,
      bio,
      address,
      lat,
      lng,
      miles,
      hourlyRate,
      grades,
      subjects,
      availableOn,
    } = await request.json();

    const profileObj = {
      name,
      bio,
      location: {
        address,
        lat,
        lng,
      },
      miles,
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
      provider: authResponse.provider,
      email: authResponse.email,
    };
    return new NextResponse(JSON.stringify(obj), { status: 200 });
  } catch {
    return new NextResponse(
      JSON.stringify({ message: "Server error occurred!" }),
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
