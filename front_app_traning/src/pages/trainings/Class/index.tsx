import { Box } from "@mui/material";
import { TableModalities } from "../../modalities/ListAllModalities/components";

export const Class: React.FC = () => {
  return(
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
      <TableModalities />
    </Box>
  );
};
