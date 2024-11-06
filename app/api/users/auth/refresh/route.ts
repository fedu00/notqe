import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/dbConfig/dbConfig";
import { cookies } from "next/headers";

import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    // console.log("he?");
    connectMongoDB();
    // console.log("mongodbhe?");
    const refreshToken = request.cookies.get("refreshToken")?.value || ""; //czy tu jakis await?
    // console.log("--------------------------------------------------");
    // console.log("2", refreshToken);
    if (!refreshToken) {
      return NextResponse.json(
        { error: "Refresh token missing" },
        { status: 403 }
      );
    }

    // Weryfikacja `refresh token`
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
    const newAccessToken = jwt.sign(
      { id: decoded.id, email: decoded.email },
      process.env.TOKEN_SECRET!,
      { expiresIn: "15m" }
    );

    const response = NextResponse.json({ success: true });
    response.cookies.set("token", newAccessToken, { httpOnly: true });
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid refresh token" },
      { status: 403 }
    );
  }
}
