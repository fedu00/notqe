import { connectMongoDB } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import { getDataFromHeader } from "@/helpers/getDataFromHeader";
import User from "@/models/userModel";

export async function GET(request: NextRequest) {
  try {
    connectMongoDB();
    const userId = await getDataFromHeader(request);

    if (!userId) {
      throw new Error("We can't get user ID");
    }
    const user = await User.findOne({ _id: userId }).select("-password");
    if (!user) {
      throw new Error("Can't find this user!");
    }

    return NextResponse.json({
      message: "user found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 401 }
    );
  }
}
