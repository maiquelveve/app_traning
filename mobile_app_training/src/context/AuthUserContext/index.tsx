import { createContext, useContext } from "react";
import { useAlertContext } from "../AlertContext";

const AuthUserContext = createContext({} as IAuthUserContext);

export const useAuthUserContext = () => {
  return useContext(AuthUserContext);
};

export const AuthUserProvider: React.FC<IAppProps> = ({ children }) => {
  const { alertCatch } = useAlertContext();
  
  const createUser = async (user: IUserCreateProps): Promise<IReturnedRequest> => {
    try {
      console.log(user);
      alertCatch();
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

  return(
    <AuthUserContext.Provider value={{
      createUser,
    }} >
      {children}
    </AuthUserContext.Provider>
  );
};
