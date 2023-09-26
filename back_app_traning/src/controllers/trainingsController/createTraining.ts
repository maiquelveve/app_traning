import { Request, Response } from "express";

import { RETURNED_API_ERRORS_500, RETURNED_API_SUCCESS } from "../../returnsRequests";
import { initialTransactionDB } from "../../helpers";
import { Training, TrainingDetail } from "../../models";

export const createTraining = async (
  req: Request<object, object, IBodyAuth & ITrainingCreateUpdate>, 
  res: Response
): Promise<Response> => {
  const transactionBD = await initialTransactionDB();

  try {
    const { auth_user_id, modality_id, tag, training, video_url, details } = req.body;

    const newTraining = await Training.create({
      tag,
      training,
      video_url,
      modality_id,
      user_trainer_id: auth_user_id
    }, { transaction: transactionBD });

    if(details.length) {
      const detailsDB = details.map((detail) => {
        return {
          ...detail,
          training_id: newTraining.id
        };
      });
      await TrainingDetail.bulkCreate(detailsDB, { transaction: transactionBD });
    }

    transactionBD.commit();
    return res.status(200).json(RETURNED_API_SUCCESS({ 
      data: [], 
      messageSuccess: "Treino criado com sucesso." 
    }));

  } catch (error) {
    console.log(error);
    transactionBD.rollback();
    return res.status(500).json(RETURNED_API_ERRORS_500());
  }
};
