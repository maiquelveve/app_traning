import * as fs from "node:fs";

export const deleteFileInDir = ({ pathFile }: IDeleteFileDirProps) => {
  try {
    fs.unlinkSync(pathFile);
    return true;

  } catch (error) {
    return false;
  }
};
