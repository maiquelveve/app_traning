import { createContext, useContext, useRef } from "react";

import { apiService } from "@src/services/api";

import { useAlertContext } from "@src/context/AlertContext";
import { getTokenUserLocalStorage, saveUserDataLocalStorage } from "@src/context/AuthUserContext/helpers";

const AuthUserContext = createContext({} as IAuthUserContext);

export const useAuthUserContext = () => {
  return useContext(AuthUserContext);
};

export const AuthUserProvider: React.FC<IAppProps> = ({ children }) => {
  const { alertCatch, alertResponse } = useAlertContext();

  const tokenRef = useRef<string | null>("");
  
  const createUser = async (user: IUserCreateProps): Promise<boolean | undefined> => {
    try {
      const { name, email, password } = user;
      const responseApi = await apiService.post<IReturnedRequest>("/users", { name, email, password });

      if(responseApi.data.isSuccess) {
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
        await saveUserDataLocalStorage({ user: { ...responseApi.data.data[0].user, token: responseApi.data.data[0].token } });
        await setUserDataRefLocal();

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

  const setUserDataRefLocal = async () => {
    const token = await getTokenUserLocalStorage();
    tokenRef.current = token;
  };

  return(
    <AuthUserContext.Provider value={{
      createUser,
      loginUser,
      getToken: () => tokenRef.current,
    }} >
      {children}
    </AuthUserContext.Provider>
  );
};
