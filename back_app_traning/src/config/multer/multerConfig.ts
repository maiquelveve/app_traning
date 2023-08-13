import multer, { Options } from "multer";
import crypto from "crypto";

import { ERROR_SET_FILE_NAME, ERROR_INVALID_TYPE_FILE, PROFILE_IMG_FILE_DIR } from "../constants";

export const multerConfig: Options = {
  dest: PROFILE_IMG_FILE_DIR,
  
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, PROFILE_IMG_FILE_DIR);
    },
    filename(req, file, callback) {
      crypto.randomBytes(16, (err, hash) => {
        if(err) {
          callback(new Error(ERROR_SET_FILE_NAME), "");
        } 
        
        const filename = `${hash.toString("hex")}-${file.originalname}`;
        callback(null, filename);
      });
    },
  }),

  limits: {
    fieldSize: 2 * 1024 * 1024
  },

  fileFilter(req, file, callback) {
    const allowMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
    ];

    if(allowMimes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error(ERROR_INVALID_TYPE_FILE));
    }
  },
};
