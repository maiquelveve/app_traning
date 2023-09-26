import { Request, Response } from "express";

import { RETURNED_API_ERRORS, RETURNED_API_ERRORS_500, RETURNED_API_SUCCESS } from "../../returnsRequests";

import { verifyExistingTrainingCreate } from "../../validations";
import { initialTransactionDB, serializeData } from "../../helpers";
import { Modality, Training, TrainingDetail, User } from "../../models";

export const createTraining = async (
  req: Request<object, object, IBodyAuth & ITrainingCreateUpdate>, 
  res: Response
): Promise<Response> => {
  const transactionBD = await initialTransactionDB();

  try {
    const { auth_user_id, modality_id, tag, training, video_url, details } = req.body;

    const isExistTraining = await verifyExistingTrainingCreate({ modality_id, tag, training, user_trainer_id: auth_user_id  });
    if(isExistTraining.error) {
      transactionBD.rollback();
      return res.status(200).json(RETURNED_API_ERRORS({ errors: [isExistTraining.message] }));
    }

    const newTraining = await Training.create({
      tag,
      training,
      video_url,
      modality_id,
      user_trainer_id: auth_user_id
    }, { transaction: transactionBD });

    if(details.length) {
      const detailsDB: ITrainingDetail[] = details.map((detail) => {
        return {
          description: serializeData(detail.description),
          value: serializeData(detail.value),
          training_id: newTraining.id
        };
      });
      await TrainingDetail.bulkCreate(detailsDB, { transaction: transactionBD });
    }

    const returnTraining = await Training.findByPk(newTraining.id, {
      include: [
        {model: User, as: "trainer"},
        {model: Modality, as: "modality"},
        {model: TrainingDetail, as: "trainingDetails"},
      ],
      transaction: transactionBD
    });

    transactionBD.commit();
    return res.status(200).json(RETURNED_API_SUCCESS({ 
      data: [returnTraining], 
      messageSuccess: "Treino criado com sucesso." 
    }));

  } catch (error) {
    transactionBD.rollback();
    return res.status(500).json(RETURNED_API_ERRORS_500());
  }
};
