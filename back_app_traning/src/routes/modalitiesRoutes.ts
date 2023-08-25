import { Router } from "express";

import { authSystem } from "../middleware";
import { modalitiesController } from "../controllers/modalitiesController";

const modalitiesRoutes = Router();

modalitiesRoutes.get(
  "/modalities", 
  authSystem({ permissions: ["root"] }),
  modalitiesController.getAllModelities
);


export { modalitiesRoutes };
