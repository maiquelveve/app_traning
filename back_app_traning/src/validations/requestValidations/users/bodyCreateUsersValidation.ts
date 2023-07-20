import { validation } from "../../../middleware";
import { usersCreateSchemas } from "../../schemasValidations";

export const bodyCreateUsersValidation = validation("body", usersCreateSchemas);
