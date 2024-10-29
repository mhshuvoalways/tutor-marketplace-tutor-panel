import { dbConnect } from "@/app/services/mongodb";
import AuthModel from "@/app/models/AuthModel";
import TutorProfileModel from "@/app/models/ProfileModel";
import { NextResponse } from "next/server";

export const loginGoogle = async (data) => {
  const { name, email, picture } = data;
  try {
    await dbConnect();
    const findUser = await AuthModel.findOne({ email });
    if (!findUser) {
      const userObj = {
        email,
        provider: "google",
      };
      const auth = await new AuthModel(userObj).save();
      const profileObj = {
        user: auth._id,
        name,
        avatar: {
          url: picture,
        },
      };
      const response = await new TutorProfileModel(profileObj).save();
      return new NextResponse(JSON.stringify(response), { status: 200 });
    } else {
      return new NextResponse(
        JSON.stringify({ message: "Tutor already exit!" }),
        {
          status: 400,
        }
      );
    }
  } catch {
    return new NextResponse(
      JSON.stringify({ message: "Server error occured!" }),
      { status: 500 }
    );
  }
};
