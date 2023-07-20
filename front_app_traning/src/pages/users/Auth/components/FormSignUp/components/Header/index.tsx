import { Box, Typography, Stack } from "@mui/material";

import Logo from "../../../../../../../components/Logo";
import { blueGrey } from "@mui/material/colors";

export const Header: React.FC = () => {
  return(
    <Box component={Stack} spacing={3} display="flex" flexDirection="column" alignItems="center" justifyContent="center" mb={1}>
      <Box sx={{ mb: 1 }}>
        <Logo type="removebgmain" />
      </Box>
      <Box width="100%">
        <Stack alignItems="center" justifyContent="center" spacing={1}>
          <Typography color={blueGrey["A400"]} gutterBottom variant={"h5"} fontWeight="bold" >
            CADASTRAR-SE
          </Typography>
          <Typography variant="overline" fontStyle="italic"  fontSize="12p" fontWeight="bold" textAlign={"inherit"}>
            INFORME OS DADOS
          </Typography>
        </Stack>
      </Box>  
    </Box>
  );
};
