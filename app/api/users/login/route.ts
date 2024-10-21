import { connectMongoDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectMongoDB();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "user does not exist" },
        { status: 400 }
      );
    }

    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json({ error: "invalid password" }, { status: 400 });
    }
    const tokenData = {
      id: user._id,
      email: user.email,
    };
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "login successful",
      success: true,
    });

    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { userId, category, taskImportance } = body;
  await User.findByIdAndUpdate(userId, {
    $inc: {
      [`doneTasks.categories.${category}`]: 1,
      [`doneTasks.importanceLevel.${taskImportance}`]: 1,
    },
  });

  return NextResponse.json({ message: "user update!" }, { status: 200 });
}
