import { Router } from "express";

import { authSystem } from "../middleware";
import { modalitiesController } from "../controllers";

const modalitiesRoutes = Router();

modalitiesRoutes.get(
  "/modalities", 
  authSystem({ permissions: ["root", "trainer"] }),
  modalitiesController.getModelities
);


export { modalitiesRoutes };
