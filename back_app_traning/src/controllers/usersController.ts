import { Request, Response } from "express";

import User from "../models/User";

import { RETURNED_API_ERRORS, RETURNED_API_ERRORS_500, RETURNED_API_SUCCESS } from "../returnsRequests";
import { verifyEmailExist } from "../validations";

export default {
  async create(req: Request<object, object, IUserCreate>, res: Response): Promise<Response> {
    try {
      const { name, email, password } = req.body;

      if(!await verifyEmailExist({ email, typeOperation: "create" })) {
        return res.status(400).json(RETURNED_API_ERRORS({ errors: ["Email já cadastrado no sistema!"] }));
      }

      await User.create({ name, password, email });

      return res.status(200).json(RETURNED_API_SUCCESS({ data: [], messageSuccess: "Usuário cadastrado com sucesso." }));

    } catch (error) {
      return res.status(500).json(RETURNED_API_ERRORS_500());
    }
  }
};
