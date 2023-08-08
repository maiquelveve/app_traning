import multer from "multer";

import {  UPLOAD_FILE_SYSTEM_NAME, multerConfig } from "../config";

export const uploadFileSystem = multer(multerConfig).single(UPLOAD_FILE_SYSTEM_NAME);
