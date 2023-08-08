import multer from "multer";

import { UPLOAD_IMG_PROFILE, multerConfig } from "../config";

export const uploadImgProfileSystem = multer(multerConfig).single(UPLOAD_IMG_PROFILE);
