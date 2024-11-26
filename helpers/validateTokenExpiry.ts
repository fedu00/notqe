import jwt, { TokenExpiredError } from "jsonwebtoken";

export const validateTokenExpiry = (token: string) => {
  try {
    if (!process.env.TOKEN_SECRET || !token) {
      throw new Error("TOKEN_SECRET or token is not provided");
    }
    jwt.verify(token, process.env.TOKEN_SECRET!);
    return false;
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return true;
    }
    throw err;
  }
};
