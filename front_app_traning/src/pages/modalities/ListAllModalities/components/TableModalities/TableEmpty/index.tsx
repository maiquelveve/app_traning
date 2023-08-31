import { Box, Typography } from "@mui/material";

export const TableEmpty: React.FC = () => {
  return(
    <Box display="flex" justifyContent="center" alignItems="center" flex={1} height={150} flexDirection="column">
      <Typography 
        variant="body2"
        fontSize={18}
      >
          Nenhuma modalidade encontrada
      </Typography>
      <Typography 
        variant="caption"
        color="gray"
      >
          Utilize os filtros para melhorar sua pesquisa
      </Typography>
    </Box>
  );
};
