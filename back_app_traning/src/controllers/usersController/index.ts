import { create } from "./create";
import { login } from "./login";
import { resetPassword } from "./resetPassword";
import { getUserByToken } from "./getUserByToken";

export const usersController = {
  create,
  login,
  resetPassword,
  getUserByToken
};
