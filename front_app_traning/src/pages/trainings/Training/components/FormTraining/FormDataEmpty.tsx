import { Box, Typography } from "@mui/material";

export const FormDataEmpty: React.FC = () => {
  return(
    <Box display="flex" justifyContent="center" alignItems="center" height={150}>
      <Typography variant="button" color="red" >Dados do TREINO não foram preenchidos!</Typography>
    </Box>
  );
};
