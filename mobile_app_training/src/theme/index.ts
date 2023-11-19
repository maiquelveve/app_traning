import { extendTheme } from "native-base";

const themeSystem = extendTheme({
  colors: {
    primaryApp: {
      main: "#078d03",
      dark: "#1b5e20",
      light: "#0abf04",
      contrastText: "#ffffff",
    },
    secondaryApp: {
      main: "#0d05f2",
      dark: "#362ffb",
      light: "#1565c0",
      contrastText: "#ffffff",
    },
    backgroundApp: {
      default: "#f7f6f3",
      paper: "#ffffff",
      dark: "#121212",
      black: "#000",
      white: "#FFF"
    },
  },
});

type CustomThemeType = typeof themeSystem;

declare module "native-base" {
  interface ICustomTheme extends CustomThemeType {}
}

export { themeSystem };
