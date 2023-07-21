import { NextFunction, Request, Response, RequestHandler } from "express";
import { serializeData } from "../../helpers";

export const serializeDataBody = (nonSerializableProperties?: string[]): RequestHandler => async (
  req: Request, 
  _: Response, 
  next: NextFunction
) => {

  let newBody: object = {};
  
  if(req.body) {
    Object.keys(req.body).map((key, index) => {
      if(nonSerializableProperties?.length && nonSerializableProperties.filter(element => element === key).length) {
        newBody = { ...newBody, [key]: Object.values(req.body)[index] };
      } else {
        newBody = { ...newBody, [key]: serializeData(Object.values(req.body)[index]) };
      }
    });
  }
  
  req.body = { ...newBody };
  next();
};
