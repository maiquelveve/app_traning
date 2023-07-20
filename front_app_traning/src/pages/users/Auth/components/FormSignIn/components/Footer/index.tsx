import { Box, Link, Typography, useTheme } from "@mui/material";
import { useAuthPageContext } from "../../../../../../../context";

export const Footer: React.FC = () => {
  const { handleChangePasswordReset } = useAuthPageContext();
  const theme = useTheme();

  return (
    <Box display="flex" justifyContent="flex-end" alignItems="center" mt={1}> 
      <Typography variant="body2">
        {"Esqueceu sua senha? Clique "}
        <Link 
          onClick={handleChangePasswordReset} 
          color={theme.palette.secondary.light} 
          variant="subtitle2"
          sx={{ cursor: "pointer" }}
        >
          aqui!
        </Link>
      </Typography>
    </Box>
  );
};
