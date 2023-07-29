import { useState } from "react";
import { 
  Box, 
  CssBaseline, 
  Drawer, 
  Paper, 
  Toolbar, 
} from "@mui/material";

import { FabChangeMode, menus, AppAuthenticated } from "../../index";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

export const LayoutDashboard: React.FC<IAppProps & Props>= ({ window, children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const container = window !== undefined ? () => window().document.body : undefined;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <FabChangeMode />
      <CssBaseline />
      <Box
        component="main"
        height="100vh"
        flexDirection="column"
        sx={{
          display: "flex",
          flex: "1 1 auto",
        }}
      >
        <Box sx={{ display: "flex"}} >
          <AppAuthenticated />
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
      
          <Box component="main" sx={{ flexGrow: 1, p: 2, width: { sm: `calc(100% - ${drawerWidth}px)` }}}>
            <Toolbar />
            <Box
              component={Paper}
              p={2}
              flexDirection="column"
            >
              {children}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
