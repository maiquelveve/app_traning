import { Box, Typography, useTheme } from "@mui/material";

import { Logo } from "../../../../../components";

export const ImageSide: React.FC = () => {
  const { palette } = useTheme();
  
  return(
    <Box sx={{ p: 3 }}>
      <Typography
        align="center"
        color="inherit"
        sx={{
          fontSize: "24px",
          lineHeight: "32px",
          mb: 1
        }}
        variant="h1"
      >
          Bem vindo ao {" "}
        <Box
          component="a"
          sx={{ color: palette.primary.main }}
          target="_blank"
        >
          APP TRANING
        </Box>
      </Typography>
      <Typography
        align="center"
        sx={{ mb: 3 }}
        variant="subtitle1"
      >
        Tecnologia para treinamentos do futuro.
      </Typography>
      <Box>
        <Logo type="removebgmain" width={"auto"}  height={"auto"} />
      </Box>
    </Box>
  );
};
