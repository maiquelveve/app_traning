import { Router } from "express";

import { authSystem, serializeDataBody } from "../middleware";
import { modalitiesController } from "../controllers";

import { 
  bodyCreateUpdateModalitiesValidation
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
  bodyCreateUpdateModalitiesValidation,
  modalitiesController.createModality
);

modalitiesRoutes.put<any>(
  "/modalities/:id", 
  authSystem({ permissions: ["root"] }),
  serializeDataBody(),
  bodyCreateUpdateModalitiesValidation,
  modalitiesController.updateModality
);


export { modalitiesRoutes };
