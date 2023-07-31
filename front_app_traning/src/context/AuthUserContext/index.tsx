import { createContext, useContext, useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { LOCALSTORAGE_KEY_TOKEN } from "../../config";
import { apiService } from "../../services";
import { analysisProfiles, namesSplits } from "../../utils";
import { catchDefalutAlert, defaultAlert } from "../../components";

const AuthUserContext = createContext({} as IAuthUserContext);

export const useAuthUserContext = () => {
  return useContext(AuthUserContext);
};

export const AuthUserProvider: React.FC<IAppProps> = ({ children }) => {
  const [profilesUsersCurrent, setProfilesUserCurrent] = useState<IUserPofile[]>([]);  
  const [authUser, setAuthUser] = useState<IAuthUser | null>(null);
  const [loadingAuthUserContext, setloadingAuthUserContext] = useState(true); 
  
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();

    const fetch = async () => {
      try {
        const response = await apiService.get<IReturnedRequest>("/users/byToken", { headers: { Authorization: token } });

        if(response.data.isSuccess) {
          setProfilesUser(response.data.data[0].user.profiles);
          setAuthUserCurrent(response.data.data[0].user);
        } else {
          if(response.status === 401) {
            defaultAlert({ messages: ["Sessão inspirada! Faça login novamente."], type: "warning", position: "top" });
          } else {
            defaultAlert({ messages: response.data.errors, type: "warning", position: "top" });
          }

          handleLogout();
        }
      } catch (error) {
        catchDefalutAlert();
      }
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

  const setAuthUserCurrent = useCallback((userCurrent: IAuthUser) => {
    setAuthUser({ email: userCurrent.email, name: namesSplits(userCurrent.name) });
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
      setAuthUserCurrent,
      authUserCurrent: authUser,
    }}>
      {children}
    </AuthUserContext.Provider>
  );
};
