import * as fs from "node:fs";

export const findFile = ({ pathFile }: IFindFileProps) => {
  try {
    return fs.readFileSync(pathFile);
  } catch (error) {
    return "";    
  }
};
