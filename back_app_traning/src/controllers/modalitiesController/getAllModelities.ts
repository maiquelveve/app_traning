import { Request, Response } from "express";

import { RETURNED_API_ERRORS_500, RETURNED_API_SUCCESS } from "../../returnsRequests";

export const getAllModelities = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { auth_user_id } = req.body;
    
    const modalities = [{auth_user_id}];
    
    return res.status(200).json(RETURNED_API_SUCCESS({ data: [{ modalities }], messageSuccess: "" }));

  } catch (error) {
    return res.status(500).json(RETURNED_API_ERRORS_500());
  }
};
