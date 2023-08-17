import { Request, Response } from "express";
import { User } from "../../models";

import { RETURNED_API_ERRORS_500, RETURNED_API_SUCCESS, RETURNED_API_ERRORS } from "../../returnsRequests";
import { 
  ALLOW_MIMES_IMG_SYSTEM, 
  API_URL, 
  PROFILE_IMG_FILE_DIR, 
  ROUTES_FILES_IMGS, 
  UPLOAD_FILE_SYSTEM_NAME_SINGLE 
} from "../../config";

import { deleteFile, initialTransactionDB, newFilename, writeFile, findFile } from "../../helpers";
import { filesValidations } from "../../validations";

export const uploadImgProfile = async (req: Request<object, object, IBodyAuth>, res: Response): Promise<Response> => {
  const transactionDB = await initialTransactionDB();

  try {
    const file = req[UPLOAD_FILE_SYSTEM_NAME_SINGLE];
    const fileValidation = filesValidations({ file, allowMimes: ALLOW_MIMES_IMG_SYSTEM });

    if(!file || fileValidation.isError) {
      return res.status(404).json(RETURNED_API_ERRORS({ errors: fileValidation.errors }));
    }

    const user_id = req.body.auth_user_id;
    const user = await User.findByPk(user_id, { attributes: { exclude: ["id", "password"] } });

    const filename = await newFilename({ originalname: file.originalname });
    const avatar_url = `${API_URL}${ROUTES_FILES_IMGS}/${filename}`;
    const avatar_filename = filename;
    
    if(user?.avatar_filename) {
      const pathFile = `${PROFILE_IMG_FILE_DIR}/${user.avatar_filename}`; 
      const currentFile = findFile({ pathFile });
      
      if(currentFile) deleteFile({ pathFile });
    }
    
    await User.update({ avatar_url, avatar_filename }, { where: { id: user_id }, transaction: transactionDB });
    writeFile({filename: filename, fileBuffer: file.buffer});

    transactionDB.commit();
    return res.status(200).json(RETURNED_API_SUCCESS({ 
      data: [ { user: { name: user?.name, email: user?.email, avatar_url, avatar_filename } } ], 
      messageSuccess: "" 
    }));

  } catch (error) {
    transactionDB.rollback();
    return res.status(500).json(RETURNED_API_ERRORS_500());
  }
};
