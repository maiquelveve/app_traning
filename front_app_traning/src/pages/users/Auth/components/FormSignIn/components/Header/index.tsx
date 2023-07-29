import { Box, Typography, Stack, useTheme, Button, Divider } from "@mui/material";
import { ManageAccounts  } from "@mui/icons-material";

import {Logo} from "../../../../../../../components";
import { blueGrey } from "@mui/material/colors";
import { useAuthPageContext } from "../../../../../../../context";

export const Header: React.FC = () => {
  const { handleChangeSignUp } = useAuthPageContext();
  const theme = useTheme();

  return(
    <Box component={Stack} spacing={3} display="flex" flexDirection="column" alignItems="center" justifyContent="center" mb={1}>
      <Box sx={{ mb: 1 }}>
        <Logo type="removebgmain" />
      </Box>
      <Box width="100%">
        <Stack alignItems="center" justifyContent="center" spacing={1}>
          <Typography color={blueGrey["A400"]} gutterBottom variant={"h5"} fontWeight="bold" >
            Seja bem vindo ao APP GYM
          </Typography>
          <Typography variant="overline" fontStyle="italic"  fontSize="12p" fontWeight="bold" textAlign={"inherit"}>
            Quer se cadastrar?
          </Typography>
        </Stack>
      </Box>  
      <Box component={Stack} spacing={3} width="100%">
        <Button
          startIcon={<ManageAccounts  />}
          variant="outlined"
          onClick={handleChangeSignUp}
          sx={{
            borderRadius: 3
          }}
        >
          CRIAR UMA CONTA
        </Button>
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
            <Typography variant="caption" >OU</Typography>
          </Button>
          <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
        </Box>
      </Box>
    </Box>
  );
};
