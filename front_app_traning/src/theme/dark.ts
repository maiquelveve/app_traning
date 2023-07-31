import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#078d03",
      dark: "#1b5e20",
      light: "#0abf04",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#0d05f2",
      dark: "#362ffb",
      light: "#1565c0",
      contrastText: "#ffffff",
    },
    background: {
      default: "#303134",
      paper: "#060606",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          background: "#060606"
        }
      }
    },
    MuiDivider: {
      defaultProps: {
        color: "#ffffff"
      }
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: "#303134"
        }
      }
    }
  },
  typography: {
    allVariants: {
      color: "white"
    }
  },
});
