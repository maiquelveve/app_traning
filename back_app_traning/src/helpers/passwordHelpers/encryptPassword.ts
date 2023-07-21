import bcrypt from "bcrypt";

export const encryptPassword = async ({ password }: EncryptPasswordProps): Promise<string> => {
  return await bcrypt.hash(password, 8);
};
