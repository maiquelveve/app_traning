import { Request, Response } from "express";

import { User, UsersProfiles } from "../../models";

import { RETURNED_API_ERRORS, RETURNED_API_ERRORS_500, RETURNED_API_SUCCESS } from "../../returnsRequests";
import { encryptPassword } from "../../helpers";
import { verifyEmailExist } from "../../validations";

export const create = async (req: Request<object, object, IUserCreate>, res: Response): Promise<Response> => {
  try {
    const { name, email, password } = req.body;
    
    const verifyEmail = await verifyEmailExist({ email, typeOperation: "create" });
    if(verifyEmail.error) {
      return res.status(400).json(RETURNED_API_ERRORS({ errors: [verifyEmail.message] }));
    }

    const newUser = await User.create({ name, email, password: await encryptPassword({ password }) });
    await UsersProfiles.create({ user_id: newUser.id });

    return res.status(200).json(RETURNED_API_SUCCESS({ data: [], messageSuccess: "Usuário cadastrado com sucesso." }));

  } catch (error) {
    return res.status(500).json(RETURNED_API_ERRORS_500());
  }
};
