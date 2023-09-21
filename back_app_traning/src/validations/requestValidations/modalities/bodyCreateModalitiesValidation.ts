import { validation } from "../../../middleware";
import { modalitiesCreateSchemas } from "../../schemasValidations";

export const bodyCreateModalitiesValidation = validation("body", modalitiesCreateSchemas);
