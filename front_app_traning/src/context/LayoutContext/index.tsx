import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { ThemeProvider } from "@mui/material";

import { lightTheme, darkTheme } from "../../theme";

const LayoutContext = createContext({} as ILayoutContext);

export const useLayoutContext = () => {
  return useContext(LayoutContext);
};

export const LayoutProvider: React.FC<IAppProps> = ({ children }) => {
  const [themeCurrent, setThemeCurrent] = useState<TThemeEnum>("light");

  const toogleTheme = useCallback(() => {
    setThemeCurrent(theme => theme === "light" ? "dark" : "light");
  }, []);

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
