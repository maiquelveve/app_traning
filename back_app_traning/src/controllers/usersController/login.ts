import { Request, Response } from "express";

import { User } from "../../models";

import { RETURNED_API_ERRORS, RETURNED_API_ERRORS_500, RETURNED_API_SUCCESS } from "../../returnsRequests";
import { decryptPassword, generateToken } from "../../helpers";

export const login = async (req: Request<object, object, IUserLogin>, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;
    
    const userAuth = await User.findOne({ where: { email }});

    if(!userAuth) {
      return res.status(400).json(RETURNED_API_ERRORS({ errors: ["Email ou senha invalidos."] }));
    }

    if(!await decryptPassword({ passwordHashDB: userAuth.password, passwordUser: password.trim() })) {
      return res.status(400).json(RETURNED_API_ERRORS({ errors: ["Email ou senha invalidos."] }));
    }

    return res.status(200).json(
      RETURNED_API_SUCCESS({ 
        data: [{ 
          name: userAuth.name, 
          email: userAuth.email, 
          token: generateToken({ id: userAuth.id })
        }], 
        messageSuccess: "" 
      })
    );

  } catch (error) {
    return res.status(500).json(RETURNED_API_ERRORS_500());
  }
};
