import { createContext, useContext } from "react";

const AuthUserContext = createContext({} as IAuthUserContext);

export const useAuthUserContext = () => {
  return useContext(AuthUserContext);
};

const createUser = async (user: IUserCreateProps): Promise<IReturnedRequest> => {
  try {
    console.log(user);
    return {
      data: [],
      errors: [""],
      success: [""],
      isError: true,
      isSuccess: false,
    };

  } catch (error: any) {
    throw Error(error);
  }
};

export const AuthUserProvider: React.FC<IAppProps> = ({ children }) => {
  return(
    <AuthUserContext.Provider value={{
      createUser,
    }} >
      {children}
    </AuthUserContext.Provider>
  );
};
