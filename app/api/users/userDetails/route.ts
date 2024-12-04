import { connectMongoDB } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import { getDataFromHeader } from "@/helpers/getDataFromHeader";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";

const getUserId = async (
  useDataFromToken: string | null,
  request: NextRequest
) => {
  if (useDataFromToken === "true") {
    return await getDataFromToken(request);
  } else {
    return await getDataFromHeader(request);
  }
};

export async function GET(request: NextRequest) {
  try {
    connectMongoDB();
    const useDataFromToken = request.headers.get("useDataFromToken");
    const userId = await getUserId(useDataFromToken, request);

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
