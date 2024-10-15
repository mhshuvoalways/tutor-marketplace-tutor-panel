import GradeModel from "@/app/models/GradeModel";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const { item } = await request.json();
    const response = await new GradeModel({ item }).save();
    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch {
    return new NextResponse(
      JSON.stringify({ message: "Server error occured" }),
      {
        status: 500,
      }
    );
  }
};

export const GET = async () => {
  try {
    const response = await GradeModel.find();
    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch {
    return new NextResponse(
      JSON.stringify({ message: "Server error occured" }),
      {
        status: 500,
      }
    );
  }
};
