import { createContext, useContext, useState, useCallback } from "react";
const AuthPageContext = createContext({} as IAuthPageContext);

export const useAuthPageContext = () => {
  return useContext(AuthPageContext);
};

export const AuthPageProvider: React.FC<IAppProps> = ({ children }) => {
  const [showFormSignIn, setShowFormSignIn] = useState(true);
  const [showFormSignUp, setShowFormSignUp] = useState(false);
  const [showFormPassword, setShowFormPassword] = useState(false);

  const handleChangeSignIn = useCallback(() => {
    setShowFormSignIn(true);
    setShowFormSignUp(false);
    setShowFormPassword(false);
  }, []);

  const handleChangeSignUp = useCallback(() => {
    setShowFormSignUp(true);
    setShowFormSignIn(false);
    setShowFormPassword(false);
  }, []);

  const handleChangePasswordReset = useCallback(() => {
    setShowFormPassword(true);
    setShowFormSignUp(false);
    setShowFormSignIn(false);
  }, []);

  return (
    <AuthPageContext.Provider value={{
      showFormSignIn,
      showFormSignUp,
      showFormPassword,
      handleChangeSignIn,
      handleChangeSignUp,
      handleChangePasswordReset,
    }}>
      {children}
    </AuthPageContext.Provider>
  );
};
