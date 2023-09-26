import { Request, Response } from "express";
import { Modality, ModalityType } from "../../models";

import { RETURNED_API_ERRORS, RETURNED_API_ERRORS_500, RETURNED_API_SUCCESS } from "../../returnsRequests";
import { verifyExistingModalityCreate } from "../../validations";
import { initialTransactionDB } from "../../helpers";

export const createModality = async (
  req: Request<object, object, IModalityCreateUpdate>, 
  res: Response
): Promise<Response> => {

  const transactionDB = await initialTransactionDB();
  try {
    const { modality, modality_type_id } = req.body;

    const isExistModality = await verifyExistingModalityCreate({ modality });
    if(isExistModality.error) {
      transactionDB.rollback();
      return res.status(400).json(RETURNED_API_ERRORS({ errors: [isExistModality.message] }));
    }

    const newModality = await Modality.create({ modality, modality_type_id }, { transaction: transactionDB });
    const newModalityFull = await Modality.findByPk(newModality.id, { 
      attributes: { exclude: ["modality_type_id"]},
      include: [{
        as: "modalityType",
        model: ModalityType,
      }],
      transaction: transactionDB
    });

    transactionDB.commit();
    return res.status(200).json(RETURNED_API_SUCCESS({ 
      data: [newModalityFull], 
      messageSuccess: "Modalidade criada com sucesso." 
    }));

  } catch (error) {
    transactionDB.rollback();
    return res.status(500).json(RETURNED_API_ERRORS_500());
  }
};
