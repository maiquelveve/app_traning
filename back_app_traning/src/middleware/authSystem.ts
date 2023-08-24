import { Request, Response, NextFunction, RequestHandler } from "express";

import { RETURNED_API_ERRORS } from "../returnsRequests";
import { verifyToken } from "../helpers";
import { connectionSql } from "../database/connectionSql";

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
      console.log("Há PERMISSAO");
      const sql = `
        SELECT u.id, u.name, u.email, p.profile 
        FROM users u
          INNER JOIN users_profiles up ON u.id = up.user_id
          INNER JOIN profiles p ON p.id = up.profile_id 
        WHERE u.id = ${auth_user_id} AND p.profile = "${permissions[0]}"
      `;
      const x = await connectionSql.query(sql);
      console.log(x);
      // vai buscar no banco se o usuario tem permissao para acessar a rota - pensar melhor depois...
    }

    req.body.auth_user_id = auth_user_id;

    next();

  } catch (error) {
    return res.status(401).json(RETURNED_API_ERRORS({ errors: ["Usuário não autorizado."] }));
  }
};
