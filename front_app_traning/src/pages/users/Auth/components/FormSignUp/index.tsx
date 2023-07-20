import { Box, Paper } from "@mui/material";

import { Footer, Form, Header } from "./components";

export const FormSignUp: React.FC = () => {
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
          <Box mt={2} mb={2}>
            <Form />
          </Box>
          <Footer />
        </Box>
      </Box>
    </Box>
  );
};
