import { Request, Response, NextFunction, RequestHandler } from "express";

import { RETURNED_API_ERRORS } from "../returnsRequests";
import { queryTypesSequelizeDB, verifyToken } from "../helpers";
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
      const[profile1, profile2, profile3] = permissions;
      
      const sql = `
        SELECT IF(COUNT(u.id) > 0, TRUE, FALSE) AS is_auth
        FROM users u
          INNER JOIN users_profiles up ON u.id = up.user_id
          INNER JOIN profiles p ON p.id = up.profile_id 
        WHERE u.id = ${auth_user_id} AND upper(p.profile) in (
          "${profile1?.toLocaleUpperCase()}", 
          "${profile2?.toLocaleUpperCase()}", 
          "${profile3?.toLocaleUpperCase()}"
        ) 
      `;
      const [{ is_auth }] = await connectionSql.query<{ is_auth: number }>(sql, { type: queryTypesSequelizeDB.SELECT });
      
      if(!is_auth) {
        throw Error("Usuário não autorizado");
      }
    }

    req.body.auth_user_id = auth_user_id;

    next();

  } catch (error) {
    return res.status(401).json(RETURNED_API_ERRORS({ errors: ["Usuário não autorizado."] }));
  }
};
