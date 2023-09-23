import { Request, Response } from "express";
import { Modality, ModalityType } from "../../models";

import { RETURNED_API_ERRORS, RETURNED_API_ERRORS_500, RETURNED_API_SUCCESS } from "../../returnsRequests";
import { initialTransactionDB, operatorsDB } from "../../helpers";

export const updateModality = async (
  req: Request<IParamsModalityId, object, IModalityCreateUpdate>, 
  res: Response
): Promise<Response> => {

  const transactionDB = await initialTransactionDB();
  try {
    const { id } = req.params;
    const { modality, modality_type_id } = req.body;
    const isExistModality = await Modality.findOne({ 
      where: { 
        modality,
        [operatorsDB.not]: {
          id
        }
      }
    });

    if(isExistModality) {
      transactionDB.rollback();
      return res.status(400).json(RETURNED_API_ERRORS({ errors: ["Modalidade já existe no sistema."] }));
    }

    await Modality.update({ modality, modality_type_id }, { where: { id }, transaction: transactionDB });
    const modalityCurrent = await Modality.findByPk(id, { 
      attributes: { exclude: ["modality_type_id"]},
      include: [{
        as: "modalityType",
        model: ModalityType,
      }],
      transaction: transactionDB
    });

    transactionDB.commit();
    return res.status(200).json(RETURNED_API_SUCCESS({ 
      data: [modalityCurrent], 
      messageSuccess: "Modalidate alterada com sucesso." 
    }));

  } catch (error) {
    transactionDB.rollback();
    return res.status(500).json(RETURNED_API_ERRORS_500());
  }
};
