import jwt from "jsonwebtoken";
import { authConfiguration } from "../../config";

export const verifyToken = (token: string): jwt.JwtPayload | string => {
  try {
    return jwt.verify(token, authConfiguration.secret);

  } catch (error: any) {
    throw Error(error);
  }
};
