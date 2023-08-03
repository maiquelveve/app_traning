import { Request, Response } from "express";

import { RETURNED_API_ERRORS, RETURNED_API_ERRORS_500, RETURNED_API_SUCCESS } from "../../returnsRequests";
import { User } from "../../models";

import { decryptPassword, encryptPassword } from "../../helpers";

export const changePassword = async (
  req: Request<object, object, IBodyAuth & IUserChangePassword>, 
  res: Response
): Promise<Response> => {

  try {
    const { auth_user_id, newPassword, passwordCurrent } = req.body;
    
    const userAuth = await User.findByPk(auth_user_id);

    if(userAuth && !await decryptPassword({ passwordHashDB: userAuth.password, passwordUser: passwordCurrent.trim() })) {
      return res.status(400).json(RETURNED_API_ERRORS({ errors: ["Senha Invalida."] }));
    }

    const password = await encryptPassword({ password: newPassword });
    await User.update({ password }, { where: { id: auth_user_id } });
    
    return res.status(200).json(RETURNED_API_SUCCESS({ data: [], messageSuccess: "Senha alterada com sucesso." }));

  } catch (error) {
    return res.status(500).json(RETURNED_API_ERRORS_500());
  }
};
