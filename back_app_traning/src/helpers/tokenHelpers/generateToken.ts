import jwt from "jsonwebtoken";
import { authConfiguration } from "../../config";

export const generateToken = ({ id }: IGenerateTokenProps) => {
  const { secret, expiresIn } = authConfiguration;

  return jwt.sign({ auth_user_id: id }, secret, { expiresIn });
};
