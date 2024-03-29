import { RequestHandler } from "express";
import { ObjectSchema, ValidationError } from "yup";
import { RETURNED_API_ERRORS } from "../returnsRequests";

export const validation = (key: TRequestProperty, schema: ObjectSchema<any>): RequestHandler => async (req, res, next) => {
  try {
    schema.validateSync(req[key], { abortEarly: false });
    return next();
  } catch (err) {
    const yupError = err as ValidationError;
    const errors: Record<string, string> = {};

    yupError.inner.forEach(error => {
      if (error.path === undefined) return;
      errors[error.path] = error.message;
    });

    return res.status(400).json(RETURNED_API_ERRORS({ errors: yupError.errors }));
  }
};
