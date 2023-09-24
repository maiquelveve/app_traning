import { validation } from "../../../middleware";
import { trainingsCreateUpdateScheamas } from "../../schemasValidations";

export const bodyCreateUpdateTrainingsValidation = validation("body", trainingsCreateUpdateScheamas);
