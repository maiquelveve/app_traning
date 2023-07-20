import { Router } from "express";

import { usersController } from "../controllers";
import { bodyCreateUsersValidation } from "../validations";

const usersRoutes = Router();

usersRoutes.post(
  "/users", 
  bodyCreateUsersValidation, 
  usersController.create
);

export { usersRoutes };
