import jwt, { TokenExpiredError } from "jsonwebtoken";

export const validateTokenExpiry = (token: string) => {
  try {
    jwt.verify(token, process.env.TOKEN_SECRET!);
    return false;
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return true;
    }
    throw err;
  }
};
