import { createContext, useContext, useCallback } from "react";

import { LOCALSTORAGE_KEY_TOKEN } from "../../config";

const AuthUserContext = createContext({} as IAuthUserContext);

export const useAuthUserContext = () => {
  return useContext(AuthUserContext);
};

export const AuthUserProvider: React.FC<IAppProps> = ({ children }) => {
    
  const setToken = useCallback((token: string) => {
    localStorage.setItem(LOCALSTORAGE_KEY_TOKEN, token);
  }, []);
  
  const getToken = useCallback(() => {
    return localStorage.getItem(LOCALSTORAGE_KEY_TOKEN);
  }, []);
  
  const clearToken = useCallback(() => {
    localStorage.clear();
  }, []);

  return (
    <AuthUserContext.Provider value={{
      getToken,
      setToken,
      clearToken,
    }}>
      {children}
    </AuthUserContext.Provider>
  );
};
