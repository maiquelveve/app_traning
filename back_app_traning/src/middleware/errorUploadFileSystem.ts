import { NextFunction, Response } from "express";

import { ERROR_INVALID_TYPE_FILE, ERROR_SET_FILE_NAME } from "../config";
import { RETURNED_API_ERRORS } from "../returnsRequests";

export const errorUploadFileSystem = (err: Error, _: any, res: Response, next: NextFunction) => {
  if(err.message === ERROR_INVALID_TYPE_FILE) {
    return res.status(400).json(RETURNED_API_ERRORS({ errors: ["Arquivo invalido, escolha arquivo do tipo JPGE - PNG"] }));
  }

  if(err.message === ERROR_SET_FILE_NAME) {
    return res.status(400).json(RETURNED_API_ERRORS({ errors: ["Ocorreu um erro setar o nome do arquivo"] }));
  }

  next();
};
