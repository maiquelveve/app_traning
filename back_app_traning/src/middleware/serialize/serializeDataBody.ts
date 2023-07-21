import { NextFunction, Request, Response } from "express";
import { serializeData } from "../../helpers";

export const serializeDataBody = (req: Request, _: Response, next: NextFunction) => {
  let newBody: object = {};

  if(req.body) {
    Object.keys(req.body).map((key, index) => {
      newBody = { ...newBody, [key]: serializeData(Object.values(req.body)[index]) };
    });
  }
  
  req.body = { ...newBody };
  next();
};
