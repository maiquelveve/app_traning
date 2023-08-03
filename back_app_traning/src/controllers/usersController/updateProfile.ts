import { Request, Response } from "express";
import { User } from "../../models";

import { RETURNED_API_ERRORS, RETURNED_API_ERRORS_500, RETURNED_API_SUCCESS } from "../../returnsRequests";
import { verifyEmailExist } from "../../validations";

export const updateProfile = async (
  req: Request<object, object, IBodyAuth & IUserUpdateProfile>, 
  res: Response
): Promise<Response> => {

  try {
    const { auth_user_id, email, name } = req.body;
    
    const verifyEmail = await verifyEmailExist({id: auth_user_id, email, typeOperation: "edit" });
    if(verifyEmail.error) {
      return res.status(400).json(RETURNED_API_ERRORS({ errors: [verifyEmail.message] }));
    }
    
    await User.update({ email, name }, { where: { id: auth_user_id } });
    return res.status(200).json(RETURNED_API_SUCCESS({ data: [], messageSuccess: "Usuário autualizado com sucesso." }));

  } catch (error) {
    return res.status(500).json(RETURNED_API_ERRORS_500());
  }
};
