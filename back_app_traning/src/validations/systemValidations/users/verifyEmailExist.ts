export const verifyEmailExist = async ({ email, typeOperation }: IVerifyEmailExistProps): Promise<boolean> => {
  try {
    console.log(email, typeOperation);
    return true;

  } catch (error: any) {
    throw Error(error);
  }
};
