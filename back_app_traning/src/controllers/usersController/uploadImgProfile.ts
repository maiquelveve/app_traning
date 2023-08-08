import { Request, Response } from "express";

import { RETURNED_API_ERRORS_500, RETURNED_API_SUCCESS } from "../../returnsRequests";
import { UPLOAD_FILE_SYSTEM_NAME } from "../../config";

export const uploadImgProfile = async (req: Request<object, object, IBodyAuth>, res: Response): Promise<Response> => {
  try {
    const file = req[UPLOAD_FILE_SYSTEM_NAME];
        
    return res.status(200).json(RETURNED_API_SUCCESS({ data: [file], messageSuccess: "" }));

  } catch (error) {
    return res.status(500).json(RETURNED_API_ERRORS_500());
  }
};
