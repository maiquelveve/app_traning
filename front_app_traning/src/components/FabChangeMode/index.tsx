import { Fab } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import { useLayoutContext } from "../../context";

export const FabChangeMode: React.FC<IFabChangeMode> = ({ bottom = 30, right = 30, top = undefined, left = undefined }) => {

  const { toogleTheme, themeCurrent } = useLayoutContext();

  return (
    <Fab 
      sx={{
        position: "fixed",
        top,
        bottom,
        left,
        right,
      }}
      style={{ backgroundColor: themeCurrent === "light" ? "#060606" : "#FFFFFF"}}
      onClick={toogleTheme}
    >
      {themeCurrent === "light" ?
        <DarkModeIcon style={{ color: "#fff" }} />
        :
        <LightModeIcon style={{ color: "#060606" }} />
      }
    </Fab>
  );
};
