import { Router } from "express";

import { usersController } from "../controllers";
import { bodyCreateUsersValidation, bodyLoginUsersValidation } from "../validations";

const usersRoutes = Router();

usersRoutes.post(
  "/users", 
  bodyCreateUsersValidation, 
  usersController.create
);

usersRoutes.post(
  "/users/login", 
  bodyLoginUsersValidation, 
  usersController.login
);

export { usersRoutes };
