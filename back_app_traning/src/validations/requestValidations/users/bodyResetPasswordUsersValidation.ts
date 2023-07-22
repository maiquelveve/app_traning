import { validation } from "../../../middleware";
import { usersResetPasswordSchemas } from "../../schemasValidations";

export const bodyResetPasswordUsersValidation = validation("body", usersResetPasswordSchemas);
