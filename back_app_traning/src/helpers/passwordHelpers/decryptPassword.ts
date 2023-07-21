import bcrypt from "bcrypt";

export const decryptPassword = async ({ passwordUser, passwordHashDB }: DecryptPasswordProps): Promise<boolean | void> => {
  return bcrypt.compare(passwordUser, passwordHashDB);
};
