import { Router } from "express";

import { authSystem, serializeDataBody } from "../middleware";
import { trainingsController } from "../controllers";

import { 
  bodyCreateUpdateTrainingsValidation
} from "../validations";

const trainingsRoutes = Router();

trainingsRoutes.post(
  "/trainings", 
  authSystem({ permissions: ["trainer"] }),
  serializeDataBody(),
  bodyCreateUpdateTrainingsValidation,
  trainingsController.createTraining
);

export { trainingsRoutes };
