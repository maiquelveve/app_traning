import { Request, Response } from "express";

import { User } from "../models";

import { RETURNED_API_ERRORS, RETURNED_API_ERRORS_500, RETURNED_API_SUCCESS } from "../returnsRequests";
import { decryptPassword, encryptPassword, generateToken, initialTransactionDB, passwordGenerator } from "../helpers";
import { verifyEmailExist } from "../validations";
import { sendMail } from "../services";

export default {
  async create(req: Request<object, object, IUserCreate>, res: Response): Promise<Response> {
    try {
      const { name, email, password } = req.body;
      
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
  },

  async resetPassword(req: Request<object, object, IUserResetPasswordProps>, res: Response): Promise<Response> {
    const transactionDB = await initialTransactionDB();
    
    try {
      const { email } = req.body;

      const user = await User.findOne({ where: { email }});

      if(!user) {
        return res.status(400).json(RETURNED_API_ERRORS({ errors: ["Email não cadastrado."] }));
      }

      const newPassword = passwordGenerator();
      await User.update(
        { password: await encryptPassword({ password: newPassword }) }, 
        { 
          where: { id: user.id }, 
          transaction: transactionDB 
        }
      );
      
      const sendEmailResetPassword = await sendMail({ 
        emails: [email], 
        subject: "Redefinição de Senha", 
        text: `Sua nova senha é: ${newPassword}` 
      });

      if(sendEmailResetPassword.error) {
        transactionDB.rollback();
        return res.status(400).json(RETURNED_API_ERRORS({ 
          errors: ["Ocorreu um erro, Email não enviado. Tente mais tarde", sendEmailResetPassword.message] 
        }));
      }

      transactionDB.commit();
      return res.status(200).json(RETURNED_API_SUCCESS({ data: [], messageSuccess: "Nova senha enviada para o emial." }));

    } catch (error) {
      transactionDB.rollback();
      return res.status(500).json(RETURNED_API_ERRORS_500());
    }
  }
};
