import { authConfig } from "@/app/auth.config";
import AuthModel from "@/app/models/AuthModel";
import Booking from "@/app/models/Booking";
import ProfileModel from "@/app/models/ProfileModel";
import StudentProfileModel from "@/app/models/StudentProfile";
import { dbConnect } from "@/app/services/mongodb";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await dbConnect();
    const { auth } = NextAuth(authConfig);
    const mySession = await auth();
    const email = mySession.user.email;
    const authResponse = await AuthModel.findOne({ email: email });
    const profileResponse = await ProfileModel.findOne({
      user: authResponse._id,
    });
    const response = await Booking.find({
      tutor: profileResponse.user,
    });

    const studentsProfiles = await Promise.all(
      response.map(async (el) => {
        const studentProfile = await StudentProfileModel.findOne({
          user: el.student,
        });
        return {
          ...el._doc,
          student: studentProfile,
        };
      })
    );

    return new NextResponse(JSON.stringify(studentsProfiles), { status: 200 });
  } catch {
    return new NextResponse(
      JSON.stringify({ message: "Server error occured!" }),
      { status: 500 }
    );
  }
};
