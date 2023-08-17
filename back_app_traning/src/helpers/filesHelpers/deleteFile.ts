import * as fs from "node:fs";

export const deleteFile = ({ pathFile }: IDeleteFileProps) => {
  try {
    fs.unlinkSync(pathFile);
  } catch (error: any) {
    throw Error(error);
  }
};
