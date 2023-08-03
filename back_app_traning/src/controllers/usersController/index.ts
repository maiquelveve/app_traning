import { create } from "./create";
import { login } from "./login";
import { resetPassword } from "./resetPassword";
import { getUserByToken } from "./getUserByToken";
import { updateProfile } from "./updateProfile";
import { changePassword } from "./changePassword";

export const usersController = {
  create,
  login,
  resetPassword,
  getUserByToken,
  updateProfile,
  changePassword
};
