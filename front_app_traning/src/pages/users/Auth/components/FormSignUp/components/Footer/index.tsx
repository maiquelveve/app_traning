import { Box, Typography, Stack, useTheme, Button, Divider } from "@mui/material";
import { LockOpen  } from "@mui/icons-material";

import { useAuthPageContext } from "../../../../../../../context";

export const Footer: React.FC = () => {
  const { handleChangeSignIn } = useAuthPageContext();
  const theme = useTheme();
  
  return (
    <Box component={Stack} spacing={2} width="100%">
      
      <Box
        sx={{
          alignItems: "center",
          display: "flex"
        }}
      >
        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
        <Button
          variant="outlined"
          sx={{
            cursor: "unset",
            m: 2,
            py: 0.5,
            px: 7,
            borderColor: `${theme.palette.grey[200]} !important`,
            color: `${theme.palette.grey[900]}!important`,
            fontWeight: 500,
            borderRadius: 3
          }}
          disableRipple
          disabled
        >
          <Typography variant="caption">JÁ É CADASTRADO?</Typography>
        </Button>
        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
      </Box>
      
      <Button
        onClick={handleChangeSignIn}
        startIcon={<LockOpen  />}
        variant="outlined"
        sx={{
          borderRadius: 3
        }}
      >
          ACESSE SUA CONTA
      </Button>
    </Box>
  );
};
