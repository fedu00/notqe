import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromHeader = (request: NextRequest) => {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      throw new Error("Authorization header missing");
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new Error("Token not provided");
    }

    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
