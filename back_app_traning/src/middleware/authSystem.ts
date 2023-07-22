import { Request, Response, NextFunction, RequestHandler } from "express";

import { RETURNED_API_ERRORS } from "../returnsRequests";
import { verifyToken } from "../helpers";

export const authSystem = ({ permissions }: ISystemPermission): RequestHandler => async (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {

  try {
    const { authorization } = req.headers;

    if(!authorization) {
      throw Error("Usuário não autorizado");
    }

    const decoded = verifyToken(authorization);
    const { auth_user_id } = decoded as IJwtPayloadAuthUser;

    if(permissions?.length) {
      // vai buscar no banco se o usuario tem permissao para acessar a rota - pensar melhor depois...
    }

    req.body.auth_user_id = auth_user_id;

    next();

  } catch (error) {
    return res.status(401).json(RETURNED_API_ERRORS({ errors: ["Usuário não autorizado."] }));
  }
};
