import { authConfig } from "@/app/auth.config";
import AuthModel from "@/app/models/AuthModel";
import AvailabilityModel from "@/app/models/AvailabilityModel";
import { dbConnect } from "@/app/services/mongodb";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await dbConnect();
    const { auth } = NextAuth(authConfig);
    const session = await auth();
    const email = session.user.email;
    const findUser = await AuthModel.findOne({ email });
    if (findUser) {
      const response = await AvailabilityModel.find({ user: findUser._id });
      return new NextResponse(JSON.stringify(response), { status: 200 });
    }
  } catch {
    return new NextResponse(
      JSON.stringify({ message: "Server error occured" }),
      {
        status: 500,
      }
    );
  }
};

export const POST = async (request) => {
  const { day, startedTime, endedTime, timeZone } = await request.json();
  try {
    await dbConnect();
    const { auth } = NextAuth(authConfig);
    const session = await auth();
    const email = session.user.email;

    const findUser = await AuthModel.findOne({ email });
    if (findUser) {
      const userObj = {
        user: findUser._id,
        day,
        startedTime,
        endedTime,
        timeZone,
      };
      const response = await new AvailabilityModel(userObj).save();
      return new NextResponse(JSON.stringify(response), { status: 200 });
    }
  } catch {
    return new NextResponse(
      JSON.stringify({ message: "Server error occured!" }),
      { status: 500 }
    );
  }
};

export const PUT = async (request) => {
  const { availId, startedTime, endedTime } = await request.json();
  try {
    await dbConnect();
    const userObj = {
      startedTime,
      endedTime,
    };
    await AvailabilityModel.findOneAndUpdate({ _id: availId }, userObj);
    return new NextResponse(JSON.stringify("Updated!"), { status: 200 });
  } catch {
    return new NextResponse(
      JSON.stringify({ message: "Server error occured!" }),
      { status: 500 }
    );
  }
};

export const DELETE = async (request) => {
  const { id } = await request.json();
  try {
    await dbConnect();
    const response = await AvailabilityModel.findOneAndDelete({
      _id: id,
    });
    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch {
    return new NextResponse(
      JSON.stringify({ message: "Server error occured!" }),
      { status: 500 }
    );
  }
};
