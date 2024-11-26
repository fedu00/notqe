import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import jwt, { JwtPayload } from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const { refreshToken } = await request.json();

    if (!refreshToken) {
      return NextResponse.json(
        { error: "Refresh token missing" },
        { status: 403 }
      );
    }
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    ) as JwtPayload;

    const newAccessToken = jwt.sign(
      { id: decoded.id, email: decoded.email },
      process.env.TOKEN_SECRET!,
      { expiresIn: "15m" }
    );

    cookies().set("token", newAccessToken, { httpOnly: true });

    const response = NextResponse.json({
      message: "decoded refreshToken successful",
      success: true,
      newAccessToken: newAccessToken,
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid refresh token" },
      { status: 403 }
    );
  }
}
