import { User } from "../../../models";

export const verifyEmailExist = async ({id, email, typeOperation }: IVerifyEmailExistProps): Promise<IVerifyEmailExistReturn> => {
  try {
    const emailExist = await User.findOne({ where: { email } });    

    if(emailExist && typeOperation === "create") {
      return { message: "Email já cadastrado no sistema!", error: true };  
    }

    if(emailExist && typeOperation === "edit") {
      if(id !== emailExist.id) {
        return { message: "Email já cadastrado no sistema!", error: true };    
      }
    }

    return { message: "", error: false };

  } catch (error: any) {
    throw Error(error);
  }
};
