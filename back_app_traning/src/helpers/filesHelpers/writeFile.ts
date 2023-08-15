import * as fs from "node:fs";

import { PROFILE_IMG_FILE_DIR } from "../../config";

export const writeFile = ({ fileBuffer, filename }: IWriteFileProps) => {
  try {
    fs.writeFileSync(`${PROFILE_IMG_FILE_DIR}/${filename}`, fileBuffer);
  } catch (error: any) {
    throw Error(error);
  }
};
