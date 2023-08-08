import multer, { Options } from "multer";
import path from "path";
import crypto from "crypto";

import { ERROR_SET_FILE_NAME, ERROR_INVALID_TYPE_FILE } from "../constants";

export const multerConfig: Options = {
  dest: path.resolve(__dirname, "..", "..", "..", "tmp", "uploads", "imgsProfiles"),
  
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, "..", "..", "..", "tmp", "uploads", "imgsProfiles"));
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
    fieldSize: 1 * 1024 * 1024
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
