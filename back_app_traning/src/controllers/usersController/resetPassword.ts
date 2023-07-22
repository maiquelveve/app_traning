import { Request, Response } from "express";

import { User } from "../../models";

import { RETURNED_API_ERRORS, RETURNED_API_ERRORS_500, RETURNED_API_SUCCESS } from "../../returnsRequests";
import { encryptPassword, initialTransactionDB, passwordGenerator } from "../../helpers";
import { sendMail } from "../../services";

export const resetPassword = async (req: Request<object, object, IUserResetPasswordProps>, res: Response): Promise<Response> => {
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
};
