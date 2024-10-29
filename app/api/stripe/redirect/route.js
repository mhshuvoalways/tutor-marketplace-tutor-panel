import { authConfig } from "@/app/auth.config";
import stripe from "@/app/config/stripe";
import AuthModel from "@/app/models/AuthModel";
import TutorProfile from "@/app/models/ProfileModel";
import { dbConnect } from "@/app/services/mongodb";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { code } = await request.json();
    await dbConnect();
    const { auth } = NextAuth(authConfig);
    const session = await auth();
    const email = session.user.email;

    const response = await stripe.oauth.token({
      grant_type: "authorization_code",
      code,
    });

    const authResponse = await AuthModel.findOne({ email });
    await TutorProfile.findOneAndUpdate(
      { user: authResponse._id },
      { tutorStripeAccountId: response.stripe_user_id },
      { new: true }
    );

    return NextResponse.json(
      {
        message: "Stripe account connected successfully",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        message: "Server error occured!",
      },
      { status: 500 }
    );
  }
}
