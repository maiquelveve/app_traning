import { Router } from "express";

import { authSystem, serializeDataBody, uploadFileSystem } from "../middleware";
import { 
  bodyCreateUsersValidation, 
  bodyLoginUsersValidation, 
  bodyResetPasswordUsersValidation, 
  bodyUpdateProfileUsersValidation,
  bodyChangePasswordUsersValidation
} from "../validations";

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

usersRoutes.put(
  "/users/profile", 
  authSystem({ permissions: [] }),
  serializeDataBody(),
  bodyUpdateProfileUsersValidation,
  usersController.updateProfile
);

usersRoutes.put(
  "/users/changePassword", 
  authSystem({ permissions: [] }),
  serializeDataBody(),
  bodyChangePasswordUsersValidation,
  usersController.changePassword
);

usersRoutes.post(
  "/users/uploadImgProfile", 
  authSystem({ permissions: [] }),
  uploadFileSystem,
  usersController.uploadImgProfile
);

export { usersRoutes };
