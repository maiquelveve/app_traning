import { create } from "./create";
import { login } from "./login";
import { resetPassword } from "./resetPassword";
import { getUserByToken } from "./getUserByToken";
import { updateProfile } from "./updateProfile";

export const usersController = {
  create,
  login,
  resetPassword,
  getUserByToken,
  updateProfile
};
