import { createContext, useContext } from "react";

import { useAlertContext } from "@src/context/AlertContext";
import { getTokenUserLocalStorage, saveUserDataLocalStorage } from "@src/context/AuthUserContext/helpers";
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

      if(responseApi.data.isError) {
        alertResponse({
          message: ["Usuário cadastrado com sucesso."],
          isSuccess: true,
          title: "Sucesso!",
        });
      } else {
        alertResponse({
          message: responseApi.data.errors,
          isSuccess: false,
          title: "Erro!",
        });
      }
      
      return responseApi.data.isSuccess;
  
    } catch (error: any) {
      alertCatch();
    }
  };

  const loginUser = async (user: IUserLoginProps): Promise<boolean | undefined> => {
    try {
      const { email, password } = user;
      const responseApi = await apiService.post<IReturnedRequest>("/users/login", { email, password });

      if(responseApi.data.isSuccess) {
        await saveUserDataLocalStorage({ token: responseApi.data.data[0].token });

      } else {
        alertResponse({
          message: responseApi.data.errors,
          isSuccess: false,
          title: "Erro!",
        });
      }
      
      return responseApi.data.isSuccess;
  
    } catch (error: any) {
      alertCatch();
    }
  };

  return(
    <AuthUserContext.Provider value={{
      createUser,
      loginUser,
      getToken: getTokenUserLocalStorage,
    }} >
      {children}
    </AuthUserContext.Provider>
  );
};
