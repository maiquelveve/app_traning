import { Box, CssBaseline } from "@mui/material";

import { FabChangeMode } from "../../FabChangeMode";

export const LayoutSingle: React.FC<IAppProps>= ({ children }) => {
  return (
    <>
      <CssBaseline />
      <Box
        component="main"
        height="100vh"
        flexDirection="column"
        sx={{
          display: "flex",
          flex: "1 1 auto"
        }}
      >
        <FabChangeMode />
        {children}
      </Box>
    </>
  );
};
