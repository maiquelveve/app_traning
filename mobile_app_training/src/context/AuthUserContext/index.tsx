import { createContext, useContext } from "react";
import { useAlertContext } from "../AlertContext";

const AuthUserContext = createContext({} as IAuthUserContext);

export const useAuthUserContext = () => {
  return useContext(AuthUserContext);
};

export const AuthUserProvider: React.FC<IAppProps> = ({ children }) => {
  const { alertCatch, alertResponse } = useAlertContext();
  
  const createUser = async (user: IUserCreateProps): Promise<boolean | undefined> => {
    try {
      console.log(user);
      alertResponse({
        isSuccess: true,
        title: "Sucesso!",
        message: ["Usuário cadastrado com sucesso."],
        variant: "left-accent",
        duration: 1000,
        placement: "top"
      });
      
      return true;
  
    } catch (error: any) {
      alertCatch();
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
