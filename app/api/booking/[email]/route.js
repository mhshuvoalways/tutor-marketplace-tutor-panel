import AuthModel from "@/app/models/AuthModel";
import Booking from "@/app/models/Booking";
import ProfileModel from "@/app/models/ProfileModel";
import { dbConnect } from "@/app/services/mongodb";
import { NextResponse } from "next/server";

export const GET = async (_, { params: { email } }) => {
  try {
    await dbConnect();
    const authResponse = await AuthModel.findOne({ email: email });
    const profileResponse = await ProfileModel.findOne({
      user: authResponse._id,
    });
    const response = await Booking.find({
      tutor: profileResponse.user,
    });

    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch {
    return new NextResponse(
      JSON.stringify({ message: "Server error occured!" }),
      { status: 500 }
    );
  }
};
