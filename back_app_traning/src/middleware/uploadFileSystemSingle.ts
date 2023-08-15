import multer from "multer";

import { UPLOAD_FILE_SYSTEM_NAME_SINGLE } from "../config";

export const uploadFileSystemSingle = multer({ storage: multer.memoryStorage() }).single(UPLOAD_FILE_SYSTEM_NAME_SINGLE);
