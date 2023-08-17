import path from "node:path";

const PROFILE_IMG_FILE_DIR_TEST = path.resolve(__dirname, "..", "..", "..", "filesUploads", "test", "imgsProfiles");
const TEST_FILE = path.resolve(__dirname, "..", "..", "..", "filesUploads", "test", "test.jpg");
const TEST_FILE_PLUS_2MB = path.resolve(__dirname, "..", "..", "..", "filesUploads", "test", "imgPlus2mb.jpg");
const TEST_FILE_TXT = path.resolve(__dirname, "..", "..", "..", "filesUploads", "test", "testTXT.txt");


export {
  PROFILE_IMG_FILE_DIR_TEST,
  TEST_FILE_PLUS_2MB,
  TEST_FILE,
  TEST_FILE_TXT,
};
