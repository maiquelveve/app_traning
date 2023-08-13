import { Request, Response } from "express";
import { User } from "../../models";

import { API_URL, PROFILE_IMG_FILE_DIR, ROUTES_FILES_IMGS, UPLOAD_FILE_SYSTEM_NAME } from "../../config";
import { RETURNED_API_ERRORS_500, RETURNED_API_SUCCESS, RETURNED_API_ERRORS } from "../../returnsRequests";

import { deleteFileInDir, verifyToken } from "../../helpers";

function getIdUser(req: Request) {
  try {
    const decoded = verifyToken(req.headers.authorization || "");
    const { auth_user_id } = decoded as IJwtPayloadAuthUser; 

    return auth_user_id;

  } catch (error: any) {
    throw Error(error);
  }
}

export const uploadImgProfile = async (req: Request, res: Response): Promise<Response> => {
  try {
    const file = req[UPLOAD_FILE_SYSTEM_NAME];
    if(!file) return res.status(400).json(RETURNED_API_ERRORS({ errors: ["Selecione um arquivo."] }));
    
    if(file.size > (2 * 1024 * 1024)) {
      const result = deleteFileInDir({ pathFile: `${PROFILE_IMG_FILE_DIR}/${file.filename}` });
      if(!result) {
        return res.status(400).json(RETURNED_API_ERRORS({ errors: ["Ocorreu um erro ao savlar o arquivo."] }));
      }

      return res.status(400).json(RETURNED_API_ERRORS({ errors: ["O tamanho do arquivo deve ser no máximo de 2MB."] }));
    }

    const user_id = getIdUser(req);
    const user = await User.findByPk(user_id, { attributes: { exclude: ["id", "password"] } });

    const avatar_url = `${API_URL}${ROUTES_FILES_IMGS}/${file?.filename}`;
    const avatar_filename = file?.filename;
    
    if(user?.avatar_filename) {
      const result = deleteFileInDir({ pathFile: `${PROFILE_IMG_FILE_DIR}/${user.avatar_filename}` });
      if(!result) return res.status(400).json(RETURNED_API_ERRORS({ errors: ["Ocorreu um erro ao savlar o arquivo."] }));
    }
    
    await User.update({ avatar_url, avatar_filename }, { where: { id: user_id } });
    return res.status(200).json(RETURNED_API_SUCCESS({ 
      data: [ { user: { name: user?.name, email: user?.email, avatar_url, avatar_filename } } ], 
      messageSuccess: "" 
    }));

  } catch (error) {
    return res.status(500).json(RETURNED_API_ERRORS_500());
  }
};
