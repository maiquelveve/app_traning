import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { ThemeProvider } from "@mui/material";

import { LOCALSTORAGE_KEY_THEME } from "../../config";
import { lightTheme, darkTheme } from "../../theme";

const LayoutContext = createContext({} as ILayoutContext);

export const useLayoutContext = () => {
  return useContext(LayoutContext);
};

export const LayoutProvider: React.FC<IAppProps> = ({ children }) => {
  
  const toogleTheme = useCallback(() => {
    setThemeCurrent(theme => theme === "light" ? "dark" : "light");
    setThemeLocalStorage();
  }, []);

  const setThemeLocalStorage = useCallback(() => {
    localStorage.setItem(LOCALSTORAGE_KEY_THEME, themeCurrent === "light" ? "dark" : "light");
  }, []);

  const getThemeLocalStorage = useCallback((): TThemeEnum  => {
    const themeLocalStorage = localStorage.getItem(LOCALSTORAGE_KEY_THEME);
    return !themeLocalStorage ? "light" : themeLocalStorage === "light" ? "light" : "dark";
  }, []);

  const themeSelected = useMemo(() => {
    return getThemeLocalStorage();
  }, []);
  
  const [themeCurrent, setThemeCurrent] = useState<TThemeEnum>(themeSelected);
  const theme = useMemo(() => {
    if(themeCurrent === "light") return lightTheme;

    return darkTheme;
  }, [themeCurrent]);

  return (
    <LayoutContext.Provider value={{ themeCurrent, toogleTheme }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </LayoutContext.Provider>
  );
};
