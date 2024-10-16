import { signUpSchema } from "@/app/lib/validations/auth";
import TutorProfileModel from "@/app/models/ProfileModel";
import AuthModel from "@/app/models/AuthModel";
import { dbConnect } from "@/app/services/mongodb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    await dbConnect();
    const { name, email, password } = await signUpSchema.parseAsync(
      await request.json()
    );
    try {
      const findUser = await AuthModel.findOne({ email });
      if (!findUser) {
        const hashed = await bcrypt.hash(password, 10);
        const userObj = {
          email,
          password: hashed,
        };
        const auth = await new AuthModel(userObj).save();
        const profileObj = {
          name,
          user: auth._id,
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
  } catch (errors) {
    const formattedErrors = errors.issues.reduce((acc, error) => {
      acc[error.path[0]] = error.message;
      return acc;
    }, {});
    return new NextResponse(JSON.stringify(formattedErrors), { status: 400 });
  }
};
