import { NextFunction, Request, Response } from "express";

export const serializeDataBody = (req: Request, res: Response, next: NextFunction) => {
  console.log("SERIALIZE MIDLEWARE");
  console.log(req.body);
  req.body.name = "Maiquel Santos Leites";
  req.body.email = "maiquel@gmail.com";
  req.body.password = "654321";
  next();
};
