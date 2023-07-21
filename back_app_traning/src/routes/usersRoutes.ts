import { Router } from "express";

import { serializeDataBody } from "../middleware";
import { usersController } from "../controllers";

import { bodyCreateUsersValidation, bodyLoginUsersValidation } from "../validations";

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

export { usersRoutes };
