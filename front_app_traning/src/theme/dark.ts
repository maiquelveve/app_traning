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
      default: "#060606",
      paper: "#303134",
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
    }
  },
  typography: {
    allVariants: {
      color: "white"
    }
  }, 
});
