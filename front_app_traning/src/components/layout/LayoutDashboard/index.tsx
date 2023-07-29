import { Box, CssBaseline, } from "@mui/material";

import { DrawerSidebarProvider } from "../../../context";
import { FabChangeMode, DrawerSidebar, AppAuthenticated, ContainerLayoutDashboard } from "../../index";

export const LayoutDashboard: React.FC<IAppProps> = ({ children }) => {
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
          <DrawerSidebarProvider>
            <AppAuthenticated />
            <DrawerSidebar />
            <ContainerLayoutDashboard>
              {children}
            </ContainerLayoutDashboard>
          </DrawerSidebarProvider>
        </Box>
      </Box>
    </>
  );
};
