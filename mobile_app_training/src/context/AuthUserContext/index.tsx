import { createContext, useContext } from "react";

import { useAlertContext } from "@src/context/AlertContext";
import { apiService } from "@src/services/api";

const AuthUserContext = createContext({} as IAuthUserContext);

export const useAuthUserContext = () => {
  return useContext(AuthUserContext);
};

export const AuthUserProvider: React.FC<IAppProps> = ({ children }) => {
  const { alertCatch, alertResponse } = useAlertContext();
  
  const createUser = async (user: IUserCreateProps): Promise<boolean | undefined> => {
    try {
      const { name, email, password } = user;
      const responseApi = await apiService.post<IReturnedRequest>("/users", { name, email, password });

      if(responseApi.data.isSuccess) {
        alertResponse({
          isSuccess: true,
          title: "Sucesso!",
          message: ["Usuário cadastrado com sucesso."],
          variant: "left-accent",
          duration: 3000,
          placement: "top"
        });
      } else {
        alertResponse({
          isSuccess: false,
          title: "Erro!",
          message: responseApi.data.errors,
          variant: "left-accent",
          duration: 3000,
          placement: "top"
        });
      }
      
      return responseApi.data.isSuccess;
  
    } catch (error: any) {
      console.log(error);
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
