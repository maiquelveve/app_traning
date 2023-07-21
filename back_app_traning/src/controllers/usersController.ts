import { Request, Response } from "express";

import { User } from "../models";

import { RETURNED_API_ERRORS, RETURNED_API_ERRORS_500, RETURNED_API_SUCCESS } from "../returnsRequests";
import { decryptPassword, encryptPassword, serializeData } from "../helpers";
import { verifyEmailExist } from "../validations";

export default {
  async create(req: Request<object, object, IUserCreate>, res: Response): Promise<Response> {
    try {

      console.log("CONTROLL");
      console.log(req.body);

      const name = serializeData(req.body.name);
      const email = serializeData(req.body.email);
      const password = req.body.password;

      const verifyEmail = await verifyEmailExist({ email, typeOperation: "edit" });
      if(verifyEmail.error) {
        return res.status(400).json(RETURNED_API_ERRORS({ errors: [verifyEmail.message] }));
      }

      await User.create({ name, email, password: await encryptPassword({ password }) });

      return res.status(200).json(RETURNED_API_SUCCESS({ data: [], messageSuccess: "Usuário cadastrado com sucesso." }));

    } catch (error) {
      return res.status(500).json(RETURNED_API_ERRORS_500());
    }
  },

  async login(req: Request<object, object, IUserLogin>, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      
      const userAuth = await User.findOne({ where: { email }});

      if(!userAuth) {
        return res.status(400).json(RETURNED_API_ERRORS({ errors: ["Email ou senha invalidos."] }));
      }

      if(!await decryptPassword({ passwordHashDB: userAuth.password, passwordUser: password })) {
        return res.status(400).json(RETURNED_API_ERRORS({ errors: ["Email ou senha invalidos."] }));
      }

      const token = "ahhauhauahu";
      return res.status(200).json(
        RETURNED_API_SUCCESS({ 
          data: [
            { name: userAuth.name, 
              email: userAuth.email, 
              token 
            }
          ], 
          messageSuccess: "" 
        })
      );

    } catch (error) {
      return res.status(500).json(RETURNED_API_ERRORS_500());
    }
  }
};
