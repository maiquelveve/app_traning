import { Box, Button } from "@mui/material";
import { useAuthPageContext } from "../../../../../../../context";
import { LockOpen } from "@mui/icons-material";

export const Footer: React.FC = () => {
  const { handleChangeSignIn } = useAuthPageContext();

  return (
    <Box> 
      <Button
        fullWidth
        size="large"
        variant="contained"
        color="secondary"
        startIcon={<LockOpen  />}
        onClick={handleChangeSignIn}
        sx={{
          borderRadius: 5,
          mt: 3
        }}
      >
        Acessar a sua conta
      </Button>
    </Box>
  );
};
