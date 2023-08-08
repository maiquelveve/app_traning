import multer, { Options  } from "multer";
import path from "path";
import crypto from "crypto";

export const multerConfig: Options = {
  dest: path.resolve(__dirname, "..", "..", "..", "tmp", "uploads", "imgsProfiles"),
  
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, "..", "..", "..", "tmp", "uploads", "imgsProfiles"));
    },
    filename(req, file, callback) {
      crypto.randomBytes(16, (err, hash) => {
        if(err) {
          callback(err, "");
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
      callback(new Error("Invalid file type"));
    }
  },
};
