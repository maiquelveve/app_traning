import { AppBar, Box, IconButton, Toolbar, Typography, } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { useDrawerSidebarContext } from "../../../context";

export const AppBarDefault: React.FC<IAppProps> = ({ children }) => {
  const { drawerWidth, handleDrawerToggle } = useDrawerSidebarContext();

  return (
    <AppBar
      position="fixed"
      sx={{
        ml: { sm: `${drawerWidth}px` },
        backgroundColor: "",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          APP TRAINING
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        {children}
      </Toolbar>
    </AppBar>
  );
};
