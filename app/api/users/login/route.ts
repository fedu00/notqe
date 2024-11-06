import { connectMongoDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextApiResponse } from "next";
// import cookie from "cookie";
import { cookies } from "next/headers";

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
      expiresIn: "4s", //
    });

    const refreshToken = await jwt.sign(
      tokenData,
      process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: "7d" }
    );

    // const response = NextResponse.json({
    //   message: "login successful",
    //   success: true,
    // });
    // response.headers.set(
    //   "Access-Control-Allow-Origin",
    //   "http://localhost:3000"
    // );
    // response.headers.set("Access-Control-Allow-Credentials", "true");

    // response.headers('Set-Cookie', cookie.serialize('viewedWelcomeMessage', 'true'))

    //|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
    // response.cookies.set("token", token, { httpOnly: true });
    // response.cookies.set("refreshToken", refreshToken, {
    //   httpOnly: true,
    //   secure: false,
    //   sameSite: "lax", // Adjust based on your needs
    //   maxAge: 60 * 60 * 24 * 7,
    //   path: "/",
    // });
    // response.cookies.set("myCookie", "cookieValue", {
    //   httpOnly: true,
    //   secure: false,
    //   maxAge: 60 * 60 * 24,
    //   sameSite: "strict",
    // });
    // console.log(
    //   "route login, sprawdzam czy cookies jest",
    //   cookies().get("myCookie")
    // );
    // console.log("////////////////  /////////////////");
    //|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
    cookies().set("myCookie", "cookieValue");
    cookies().set("token", token);
    cookies().set("refreshToken", refreshToken);

    // cookies().set("token", token, { httpOnly: true });
    // cookies().set("refreshToken", refreshToken, {
    //   httpOnly: true,
    //   secure: false,
    //   sameSite: "lax", // Adjust based on your needs
    //   maxAge: 60 * 60 * 24 * 7,
    //   path: "/",
    // });
    // cookies().set("myCookie", "cookieValue");

    // response.setHeader('Set-Cookie', cookie.serialize('viewedWelcomeMessage', 'true'))

    return NextResponse.json({ message: "login successful", success: true });
    // return response.status(200).json({
    //   message: "login successful",
    //   success: true,
    // });
  } catch (error: any) {
    console.log("-------->", error);

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
