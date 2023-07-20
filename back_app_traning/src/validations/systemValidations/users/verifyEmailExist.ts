export const verifyEmailExist = async ({ email, typeOperation }: IVerifyEmailExistProps): Promise<IVerifyEmailExistReturn> => {
  try {
    console.log(email, typeOperation);
    return { message: "Email já cadastrado no sistema!", error: true };

  } catch (error: any) {
    throw Error(error);
  }
};
