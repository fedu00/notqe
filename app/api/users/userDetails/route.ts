import { connectMongoDB } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import { getDataFromHeader } from "@/helpers/getDataFromHeader";
import User from "@/models/userModel";

connectMongoDB();

export async function GET(request: NextRequest) {
  const res = NextResponse.json({ message: "user found" });
  res.headers.set("Access-Control-Allow-Origin", "http://localhost:3000");
  res.headers.set("Access-Control-Allow-Credentials", "true");
  try {
    const userId = await getDataFromHeader(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json({
      message: "user found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 400 }
    );
  }
}
