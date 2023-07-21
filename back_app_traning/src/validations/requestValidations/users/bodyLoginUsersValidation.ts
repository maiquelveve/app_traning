import { validation } from "../../../middleware";
import { usersLoginSchemas } from "../../schemasValidations";

export const bodyLoginUsersValidation = validation("body", usersLoginSchemas);
