import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { TRoutesStacks } from "interface/route";

import { apiService } from "@src/services/api";

import { useAlertContext } from "@src/context/AlertContext";
import { 
  clearUserDataLocalStorage, 
  getTokenUserLocalStorage,
  getUserAuthLocalStorage, 
  getUserProfilesLocalStorage, 
  saveUserDataLocalStorage 
} from "@src/context/AuthUserContext/helpers";

const AuthUserContext = createContext({} as IAuthUserContext);

export const useAuthUserContext = () => {
  return useContext(AuthUserContext);
};

export const AuthUserProvider: React.FC<IAppProps> = ({ children }) => {
  const [loadingAuthContext, setLoadingAuthContext] = useState(true);
  const { alertCatch, alertResponse } = useAlertContext();
  
  const navigation = useNavigation<TRoutesStacks>();

  const userAuthRef = useRef<IUserAuthLocalStorageData | null>(null);
  const isTrainerProfilesRef = useRef<boolean>(false);
  const isUserProfilesRef = useRef<boolean>(false);
  const isRootProfilesRef = useRef<boolean>(false);
  const tokenRef = useRef<string | null>(null);

  useEffect(() => {
    setLoadingAuthContext(true);

    const onLoad = async () => {
      await setUserDataRefLocal();
    };
    onLoad();
    setLoadingAuthContext(false);

  }, []);
  
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

  const loginUser = async (user: IUserLoginProps): Promise<void> => {
    try {
      const { email, password } = user;
      const responseApi = await apiService.post<IReturnedRequest>("/users/login", { email, password });

      if(responseApi.data.isSuccess) {
        await saveUserDataLocalStorage({ user: { ...responseApi.data.data[0].user, token: responseApi.data.data[0].token } });
        await setUserDataRefLocal();
        
        navigation.navigate("init_auth");

      } else {
        alertResponse({
          message: responseApi.data.errors,
          isSuccess: false,
          title: "Erro!",
        });
      }
    } catch (error: any) {
      alertCatch();
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await clearUserDataLocalStorage();
      tokenRef.current = null;
      userAuthRef.current = null;
      isRootProfilesRef.current = false;
      isTrainerProfilesRef.current = false;
      isUserProfilesRef.current = false;
      
      navigation.navigate("init");

    } catch (error) {
      alertCatch();
    }
  };

  const setUserDataRefLocal = async () => {
    tokenRef.current = await getTokenUserLocalStorage();
    userAuthRef.current = await getUserAuthLocalStorage();
    
    const profiles = await getUserProfilesLocalStorage();
    isRootProfilesRef.current = profiles ? profiles.isRootProfiles : false ;
    isTrainerProfilesRef.current = profiles ? profiles.isTrainerProfiles : false ;
    isUserProfilesRef.current = profiles ? profiles.isUserProfiles : false ;
  };

  return(
    <AuthUserContext.Provider value={{
      createUser,
      loginUser,
      logout,
      getToken: () => tokenRef.current,
      getUserAuth: () => userAuthRef.current,
      getProfilesUserAuth: () => ({
        isRootProfiles: isRootProfilesRef.current,
        isTrainerProfiles: isTrainerProfilesRef.current,
        isUserProfiles: isUserProfilesRef.current
      }),
      loadingAuthContext,
    }} >
      {children}
    </AuthUserContext.Provider>
  );
};
