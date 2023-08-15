import path from "node:path";

const UPLOAD_FILE_SYSTEM_NAME_SINGLE = "file";
const ERROR_SET_FILE_NAME = "Error set filename";
const ERROR_INVALID_TYPE_FILE = "Invalid file type";

const LIMIT_FILE_SIZE = (2 * 1024 * 1024);
const PROFILE_IMG_FILE_DIR = path.resolve(__dirname, "..", "..", "..", "filesUploads", "users","imgsProfiles");
const ALLOW_MIMES_IMG_SYSTEM = [
  "image/jpeg",
  "image/pjpeg",
  "image/png",
];

export {
  UPLOAD_FILE_SYSTEM_NAME_SINGLE,
  ERROR_SET_FILE_NAME,
  ERROR_INVALID_TYPE_FILE,
  PROFILE_IMG_FILE_DIR,
  LIMIT_FILE_SIZE,
  ALLOW_MIMES_IMG_SYSTEM
};
