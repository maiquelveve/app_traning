import { Box } from "@mui/material";
import { TableTrainings } from "./components";

export const Training: React.FC = () => {
  return(
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
      <TableTrainings />
    </Box>
  );
};
