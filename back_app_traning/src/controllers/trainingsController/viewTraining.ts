import { Request, Response } from "express";
import { Modality, Training, TrainingDetail, User } from "../../models";
import { verifyTrainingIsTrainer } from "../../validations";

import { RETURNED_API_ERRORS, RETURNED_API_ERRORS_500, RETURNED_API_SUCCESS } from "../../returnsRequests";

export const viewTraining = async (
  req: Request<IParamsTrainingId, object, IBodyAuth>, 
  res: Response
): Promise<Response> => {

  try {
    const { id } = req.params;
    const { auth_user_id } = req.body;

    const isTrainingIsTrainer = await verifyTrainingIsTrainer({ training_id: id, user_trainer_id: auth_user_id });
    if(isTrainingIsTrainer.error) {
      return res.status(400).json(RETURNED_API_ERRORS({ errors: [isTrainingIsTrainer.message] }));
    }
    
    const returnTraining = await Training.findByPk(id, {
      include: [
        {model: User, as: "trainer"},
        {model: Modality, as: "modality"},
        {model: TrainingDetail, as: "trainingDetails"},
      ],
    });

    return res.status(200).json(RETURNED_API_SUCCESS({ 
      data: [returnTraining], 
      messageSuccess: "" 
    }));
    
  } catch (error) {
    return res.status(500).json(RETURNED_API_ERRORS_500());
  }
};
