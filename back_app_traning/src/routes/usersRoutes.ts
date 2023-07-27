import { Router } from "express";

import { bodyCreateUsersValidation, bodyLoginUsersValidation, bodyResetPasswordUsersValidation } from "../validations";
import { authSystem, serializeDataBody } from "../middleware";

import { usersController } from "../controllers";

const usersRoutes = Router();

usersRoutes.post(
  "/users", 
  serializeDataBody(["password"]),
  bodyCreateUsersValidation, 
  usersController.create
);

usersRoutes.post(
  "/users/login", 
  serializeDataBody(["password"]),
  bodyLoginUsersValidation, 
  usersController.login
);

usersRoutes.post(
  "/users/resetPassword", 
  serializeDataBody(),
  bodyResetPasswordUsersValidation, 
  usersController.resetPassword
);

usersRoutes.get(
  "/users/byToken", 
  authSystem({ permissions: [] }),
  usersController.getUserByToken
);

export { usersRoutes };
