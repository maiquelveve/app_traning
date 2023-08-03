import { validation } from "../../../middleware";
import { usersChangePasswordSchemas } from "../../schemasValidations";

export const bodyChangePasswordUsersValidation = validation("body", usersChangePasswordSchemas);
