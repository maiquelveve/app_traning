import * as fs from "node:fs";

export const deleteFileInDir = ({ pathFile }: IDeleteFileDirProps) => {
  try {
    fs.unlinkSync(pathFile);
  } catch (error: any) {
    throw Error(error);
  }
};
