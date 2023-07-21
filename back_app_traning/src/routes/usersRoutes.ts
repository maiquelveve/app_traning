import { Router } from "express";

import { usersController } from "../controllers";
import { bodyCreateUsersValidation, bodyLoginUsersValidation } from "../validations";
import { serializeDataBody } from "../middleware";

const usersRoutes = Router();

usersRoutes.post(
  "/users", 
  bodyCreateUsersValidation, 
  serializeDataBody,
  usersController.create
);

usersRoutes.post(
  "/users/login", 
  bodyLoginUsersValidation, 
  usersController.login
);

export { usersRoutes };
