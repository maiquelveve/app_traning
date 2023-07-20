import { Box, Paper } from "@mui/material";

import { Form, Header, Footer } from "./components";

export const FormPasswordReset: React.FC = () => {
  return(
    <Box
      sx={{
        flex: "1 1 auto",
        alignItems: "center",
        display: "flex",
        justifyContent: "center"
      }}
    >
      <Box
        sx={{
          maxWidth: 550,
          px: 3,
          py: "100px",
          width: "100%"
        }}
      >
        <Box 
          component={Paper} 
          display="flex" 
          flexDirection="column" 
          minHeight='70vh'
          justifyContent="center" 
          elevation={24} 
          borderRadius={4} 
          p={4} 
        >
          <Header />
          <Box mt={1}>
            <Form />
          </Box>
          <Footer />
        </Box>
      </Box>
    </Box>
  );
};
