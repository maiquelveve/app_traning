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

trainingsRoutes.put<any>(
  "/trainings/:id", 
  authSystem({ permissions: ["trainer"] }),
  serializeDataBody(),
  bodyCreateUpdateTrainingsValidation,
  trainingsController.updateTraining
);

trainingsRoutes.get<any>(
  "/trainings/:id", 
  authSystem({ permissions: ["trainer"] }),
  trainingsController.viewTraining
);

trainingsRoutes.get(
  "/trainings", 
  authSystem({ permissions: ["trainer"] }),
  trainingsController.getTrainings
);


export { trainingsRoutes };
