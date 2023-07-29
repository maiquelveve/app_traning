import { Box, Drawer} from "@mui/material";

import { useDrawerSidebarContext } from "../../context";

import { ContainerDrawerSidebar } from "./ContainerDrawerSidebar";

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
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth, backgroundColor: "" },
        }}
      >
        <ContainerDrawerSidebar />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          width: drawerWidth,
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth, backgroundColor: "" },
        }}
        open
      >
        <ContainerDrawerSidebar />
      </Drawer>
    </Box>
  );
};
