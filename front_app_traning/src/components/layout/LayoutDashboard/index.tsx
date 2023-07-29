import { Box, CssBaseline, } from "@mui/material";

import { DrawerSidebarProvider, useAuthUserContext } from "../../../context";
import { FabChangeMode, DrawerSidebar, AppAuthenticated, AppUnauthenticated, ContainerLayoutDashboard } from "../../index";

export const LayoutDashboard: React.FC<IAppProps> = ({ children }) => {

  const { getToken } = useAuthUserContext();
  const token = getToken();

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
            {token ? <AppAuthenticated /> : <AppUnauthenticated /> }
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
