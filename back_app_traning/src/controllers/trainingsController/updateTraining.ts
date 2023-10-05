import { Request, Response } from "express";
import { Modality, Training, TrainingDetail, User } from "../../models";

import { RETURNED_API_ERRORS, RETURNED_API_ERRORS_500, RETURNED_API_SUCCESS } from "../../returnsRequests";

import { verifyExistingTrainingUpdate, verifyTrainingDetail, verifyTrainingIsTrainer } from "../../validations";
import { initialTransactionDB, serializeData } from "../../helpers";

export const updateTraining = async (
  req: Request<IParamsTrainingId, object, IBodyAuth & ITrainingCreateUpdate>, 
  res: Response
): Promise<Response> => {
  const transactionBD = await initialTransactionDB();

  try {
    const { id } = req.params;
    const { auth_user_id, modality_id, tag, training, video_url, details } = req.body;

    const isTrainingIsTrainer = await verifyTrainingIsTrainer({ training_id: id, user_trainer_id: auth_user_id });
    if(isTrainingIsTrainer.error) {
      transactionBD.rollback();
      return res.status(400).json(RETURNED_API_ERRORS({ errors: [isTrainingIsTrainer.message] }));
    }

    const isExistTraining = await verifyExistingTrainingUpdate({ modality_id, tag, training, user_trainer_id: auth_user_id, id });
    if(isExistTraining.error) {
      transactionBD.rollback();
      return res.status(400).json(RETURNED_API_ERRORS({ errors: [isExistTraining.message] }));
    }

    await TrainingDetail.destroy({ where: { training_id: id }, transaction: transactionBD });

    if(details.length) {
      const detailsDB: ITrainingDetail[] = details.map((detail) => {
        return {
          description: serializeData(detail.description),
          value: serializeData(detail.value),
          training_id: id
        };
      });

      const returnValidationsDetailsTraining = await verifyTrainingDetail({ details: detailsDB });
      if(returnValidationsDetailsTraining.error) {
        transactionBD.rollback();
        return res.status(400).json(RETURNED_API_ERRORS({ errors: returnValidationsDetailsTraining.message }));
      }

      await TrainingDetail.bulkCreate(detailsDB, { transaction: transactionBD });
    }

    await Training.update({ tag, training, video_url, modality_id }, { where: { id }, transaction: transactionBD });
    const returnTraining = await Training.findByPk(id, {
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
      messageSuccess: "Treino alterado com sucesso." 
    }));
    
  } catch (error) {
    transactionBD.rollback();
    return res.status(500).json(RETURNED_API_ERRORS_500());
  }
};
