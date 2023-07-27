import { createContext, useContext, useCallback, useState } from "react";

import { LOCALSTORAGE_KEY_TOKEN } from "../../config";
import { analysisProfiles } from "../../utils";

const AuthUserContext = createContext({} as IAuthUserContext);

export const useAuthUserContext = () => {
  return useContext(AuthUserContext);
};

export const AuthUserProvider: React.FC<IAppProps> = ({ children }) => {
  const [profilesUsersCurrent, setProfilesUserCurrent] = useState<IUserPofile[]>([]);  

  const setToken = useCallback((token: string) => {
    localStorage.setItem(LOCALSTORAGE_KEY_TOKEN, token);
  }, []);
  
  const getToken = useCallback(() => {
    return localStorage.getItem(LOCALSTORAGE_KEY_TOKEN);
  }, []);
  
  const clearToken = useCallback(() => {
    localStorage.clear();
  }, []);

  const setProfilesUser = useCallback((profiles: IUserPofile[]) => {
    setProfilesUserCurrent(profiles);
  }, []);

  const { isRootProfiles, isTrainerProfiles, isUserProfiles } = analysisProfiles({ usersProfiles: profilesUsersCurrent });
  
  return (
    <AuthUserContext.Provider value={{
      getToken,
      setToken,
      clearToken,
      profilesUsersCurrent,
      setProfilesUser,
      isRootProfiles, 
      isTrainerProfiles, 
      isUserProfiles,
    }}>
      {children}
    </AuthUserContext.Provider>
  );
};
