import { Request, Response } from "express";

import { RETURNED_API_ERRORS_500, RETURNED_API_SUCCESS } from "../../returnsRequests";
import { initialTransactionDB } from "../../helpers";

export const createTraining = async (
  req: Request<object, object, IBodyAuth & ITrainingCreateUpdate>, 
  res: Response
): Promise<Response> => {
  const transactionBD = await initialTransactionDB();

  try {
    const { auth_user_id, modality_id, tag, training, video_url } = req.body;

    console.log(auth_user_id);
    console.log(modality_id);
    console.log(tag);
    console.log(training);
    console.log(video_url);

    transactionBD.commit();
    return res.status(200).json(RETURNED_API_SUCCESS({ 
      data: [], 
      messageSuccess: "Treino criado com sucesso." 
    }));

  } catch (error) {
    transactionBD.rollback();
    return res.status(500).json(RETURNED_API_ERRORS_500());
  }
};
