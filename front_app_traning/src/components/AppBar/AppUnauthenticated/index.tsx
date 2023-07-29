import { 
  AppBar, 
  IconButton, 
  Toolbar, 
  Typography 
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 240;
const handleDrawerToggle = () => {};

export const AppUnauthenticated: React.FC = () => {
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
            Responsive drawer
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
