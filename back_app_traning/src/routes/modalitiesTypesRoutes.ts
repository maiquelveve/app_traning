import { Router } from "express";

import { modalitiesTypesController } from "../controllers";

const modalitiesTypesRoutes = Router();

modalitiesTypesRoutes.get(
  "/modalitiesTypes", 
  modalitiesTypesController.getModelitiesTypes
);


export { modalitiesTypesRoutes };
