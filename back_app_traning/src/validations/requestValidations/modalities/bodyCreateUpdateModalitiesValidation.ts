import { validation } from "../../../middleware";
import { modalitiesCreateUpdateSchemas } from "../../schemasValidations";

export const bodyCreateUpdateModalitiesValidation = validation("body", modalitiesCreateUpdateSchemas);
