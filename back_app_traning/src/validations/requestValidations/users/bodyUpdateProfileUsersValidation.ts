import { validation } from "../../../middleware";
import { usersUpdateProfileSchemas } from "../../schemasValidations";

export const bodyUpdateProfileUsersValidation = validation("body", usersUpdateProfileSchemas);
