import { 
  Box, 
  Drawer, 
  Toolbar, 
} from "@mui/material";

import { useDrawerSidebarContext } from "../../context";
import { menus } from "..";

export const DrawerSidebar: React.FC = () => {

  const { drawerWidth, mobileOpen, handleDrawerToggle, container } = useDrawerSidebarContext();

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {menus}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          width: drawerWidth,
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          {menus}
        </Box>
      </Drawer>
    </Box>
  );
};
