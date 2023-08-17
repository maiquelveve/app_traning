import * as fs from "node:fs";

export const writeFile = ({ fileBuffer, pathFilename }: IWriteFileProps) => {
  try {
    fs.writeFileSync(pathFilename, fileBuffer);
  } catch (error: any) {
    throw Error(error);
  }
};
