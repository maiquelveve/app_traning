import { Router } from "express";

import { authSystem, serializeDataBody } from "../middleware";
import { modalitiesController } from "../controllers";

import { 
  bodyCreateModalitiesValidation
} from "../validations";

const modalitiesRoutes = Router();

modalitiesRoutes.get(
  "/modalities", 
  authSystem({ permissions: ["root", "trainer"] }),
  modalitiesController.getModelities
);

modalitiesRoutes.post(
  "/modalities", 
  authSystem({ permissions: ["root"] }),
  serializeDataBody(),
  bodyCreateModalitiesValidation,
  modalitiesController.createModality
);


export { modalitiesRoutes };
