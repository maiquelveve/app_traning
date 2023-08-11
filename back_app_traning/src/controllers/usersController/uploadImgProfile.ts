import { Request, Response } from "express";
import { User } from "../../models";

import { RETURNED_API_ERRORS_500, RETURNED_API_SUCCESS } from "../../returnsRequests";
import { API_URL, ROUTES_FILES_IMGS, UPLOAD_FILE_SYSTEM_NAME } from "../../config";
import { verifyToken } from "../../helpers";

export const uploadImgProfile = async (req: Request, res: Response): Promise<Response> => {
  try {
    const file = req[UPLOAD_FILE_SYSTEM_NAME];
    const decoded = verifyToken(req.headers.authorization || "");
    const { auth_user_id } = decoded as IJwtPayloadAuthUser;
    
    const avatar_url = `${API_URL}${ROUTES_FILES_IMGS}/${file?.filename}`;

    
    await User.update({ avatar_url, avatar_filename: file?.filename }, { where: { id: auth_user_id } });
    const user = await User.findByPk(auth_user_id, { attributes: { exclude: ["id", "password"] } });
    
    //FAZER AQUI O BUSCAR ARQUIVO E APAGAR
    return res.status(200).json(RETURNED_API_SUCCESS({ data: [{ user }], messageSuccess: "" }));

  } catch (error) {
    return res.status(500).json(RETURNED_API_ERRORS_500());
  }
};
