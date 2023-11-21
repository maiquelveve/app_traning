import { extendTheme } from "native-base";

/* CUSTOM COLORS */
const COLOR_CONTRAST_TEXT_APP = "#ffffff";

const COLOR_PRIMARY_APP_MAIN = "#078d03";
const COLOR_PRIMARY_APP_DARK = "#1b5e20";
const COLOR_PRIMARY_APP_LIGHT = "#0abf04";

const COLOR_SECONDARY_APP_MAIN = "#0d05f2";
const COLOR_SECONDARY_APP_DARK = "#362ffb";
const COLOR_SECONDARY_APP_LIGHT = "#1565c0";

const COLOR_BACKGROUND_APP_DEFAULT = "#f7f6f3";
const COLOR_BACKGROUND_APP_PAPER = "#ffffff";
const COLOR_BACKGROUND_APP_DARK = "#121212";
const COLOR_BACKGROUND_APP_BLCAK = "#000";
const COLOR_BACKGROUND_APP_WHITE = "#FFF";

const themeSystem = extendTheme({
  colors: {
    primaryApp: {
      main: COLOR_PRIMARY_APP_MAIN,
      dark: COLOR_PRIMARY_APP_DARK,
      light: COLOR_PRIMARY_APP_LIGHT,
      contrastText: COLOR_CONTRAST_TEXT_APP,
    },
    secondaryApp: {
      main: COLOR_SECONDARY_APP_MAIN,
      dark: COLOR_SECONDARY_APP_DARK,
      light: COLOR_SECONDARY_APP_LIGHT,
      contrastText: COLOR_CONTRAST_TEXT_APP,
    },
    backgroundApp: {
      default: COLOR_BACKGROUND_APP_DEFAULT,
      paper: COLOR_BACKGROUND_APP_PAPER,
      dark: COLOR_BACKGROUND_APP_DARK,
      black: COLOR_BACKGROUND_APP_BLCAK,
      white: COLOR_BACKGROUND_APP_WHITE
    },
  },
  components: {
    Button: {
      variants: {
        "solid": {
          background: COLOR_PRIMARY_APP_MAIN,
          rounded: 25,
          _pressed: {
            background: COLOR_PRIMARY_APP_DARK,
          }
        },
      },
    },
    Input: {
      defaultProps: {
        fontSize: "md"
      },
      variants: {
        "outline": {
          height: 50,
          rounded: 10,
          cursorColor: COLOR_PRIMARY_APP_DARK,
          _focus: {
            bgColor: "teal.50",  /* COLOR DEFAULT NATIVE BASE */
            borderColor: COLOR_PRIMARY_APP_LIGHT,
            borderWidth: 2,
          }
        }
      },
    },
  }
});

type CustomThemeType = typeof themeSystem;

declare module "native-base" {
  interface ICustomTheme extends CustomThemeType {}
}

export { themeSystem };
