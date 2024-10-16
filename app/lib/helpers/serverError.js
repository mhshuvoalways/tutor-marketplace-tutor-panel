import { NextResponse } from "next/server";

const ServerError = () => {
  new NextResponse(JSON.stringify({ message: "Server error occured" }), {
    status: 500,
  });
};

export default ServerError;
