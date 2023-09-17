import { Request, Response } from "express";
import { ModalityType } from "../../models";

import { RETURNED_API_ERRORS_500, RETURNED_API_SUCCESS } from "../../returnsRequests";

export const getModelitiesTypes = async (
  req: Request, 
  res: Response
): Promise<Response> => {

  try {
    const modalitiesTypes = await ModalityType.findAll();
    
    return res.status(200).json(RETURNED_API_SUCCESS({ data: [{ modalitiesTypes }], messageSuccess: "" }));

  } catch (error) {
    return res.status(500).json(RETURNED_API_ERRORS_500());
  }
};
