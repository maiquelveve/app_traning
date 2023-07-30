import { createContext, useContext, useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { LOCALSTORAGE_KEY_TOKEN } from "../../config";
import { analysisProfiles } from "../../utils";

import { apiService } from "../../services";

const AuthUserContext = createContext({} as IAuthUserContext);

export const useAuthUserContext = () => {
  return useContext(AuthUserContext);
};

export const AuthUserProvider: React.FC<IAppProps> = ({ children }) => {
  const [profilesUsersCurrent, setProfilesUserCurrent] = useState<IUserPofile[]>([]);  
  const [loadingAuthUserContext, setloadingAuthUserContext] = useState(true); 
  
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();

    const fetch = async () => {
      const response = await apiService.get<IReturnedRequest>("/users/byToken", { headers: { Authorization: token } });
      setProfilesUser(response.data.data[0].user.profiles);
    };

    if(token) {
      fetch();
    }

    setloadingAuthUserContext(false);
  }, []);

  const setToken = useCallback((token: string) => {
    localStorage.setItem(LOCALSTORAGE_KEY_TOKEN, token);
  }, []);
  
  const getToken = useCallback(() => {
    return localStorage.getItem(LOCALSTORAGE_KEY_TOKEN);
  }, []);
  
  const handleLogout = useCallback(() => {
    localStorage.clear();
    setProfilesUser([]);
    navigate("/");
  }, []);

  const setProfilesUser = useCallback((profiles: IUserPofile[]) => {
    setProfilesUserCurrent(profiles);
  }, []);

  const { isRootProfiles, isTrainerProfiles, isUserProfiles } = analysisProfiles({ usersProfiles: profilesUsersCurrent });
  
  return (
    <AuthUserContext.Provider value={{
      getToken,
      setToken,
      handleLogout,
      profilesUsersCurrent,
      setProfilesUser,
      loadingAuthUserContext,
      isRootProfiles, 
      isTrainerProfiles, 
      isUserProfiles,
    }}>
      {children}
    </AuthUserContext.Provider>
  );
};
