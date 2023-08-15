import crypto from "crypto";

export const newFilename = async ({ originalname }: INewFilenamesProps) => {
  const hash = crypto.randomBytes(16);
  return `${hash.toString("hex")}-${originalname}`;
};
