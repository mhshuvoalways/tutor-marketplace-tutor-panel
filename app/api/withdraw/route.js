import { authConfig } from "@/app/auth.config";
import AuthModel from "@/app/models/AuthModel";
import TutorProfile from "@/app/models/ProfileModel";
import WithdrawModel from "@/app/models/WithdrawModel";
import { dbConnect } from "@/app/services/mongodb";
import stripe from "@/config/stripe";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const { auth } = NextAuth(authConfig);
    const session = await auth();
    const email = session?.user?.email;

    if (!email) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }

    const authResponse = await AuthModel.findOne({ email });
    const tutorId = authResponse?._id;

    const allwithDraws = await WithdrawModel.find({ tutor: tutorId });

    return NextResponse.json(allwithDraws, { status: 200 });
  } catch {
    return NextResponse.json(
      {
        message: "Server error occured!",
      },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    await dbConnect();
    const { auth } = NextAuth(authConfig);
    const session = await auth();
    const email = session?.user?.email;

    if (!email) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }

    const authResponse = await AuthModel.findOne({ email });
    const tutorId = authResponse?._id;

    if (!tutorId) {
      return NextResponse.json(
        { message: "Tutor account not found" },
        { status: 404 }
      );
    }

    const tutorProfile = await TutorProfile.findOne({ user: tutorId });
    if (!tutorProfile) {
      return NextResponse.json(
        { message: "Tutor profile not found" },
        { status: 404 }
      );
    }

    const { balance, tutorStripeAccountId } = tutorProfile;
    if (!balance || !tutorStripeAccountId) {
      return NextResponse.json(
        { message: "Insufficient account information for withdrawal" },
        { status: 400 }
      );
    }

    await stripe.transfers.create({
      amount,
      currency: "usd",
      destination: tutorStripeAccountId,
    });

    const withdrawResponse = await new WithdrawModel({
      tutor: tutorId,
      amount: balance,
    }).save();

    await TutorProfile.findOneAndUpdate(
      { user: tutorId },
      { balance: 0 },
      { new: true }
    );

    return NextResponse.json(
      { message: "Your fund is on the way!", response: withdrawResponse },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        message:
          "An error occurred with your withdrawal. Please try again later.",
      },
      { status: 500 }
    );
  }
}
