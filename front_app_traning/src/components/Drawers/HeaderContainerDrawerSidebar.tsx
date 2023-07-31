import { useMemo } from "react";
import { Avatar, Box, Divider, Stack, Typography, useTheme } from "@mui/material";

import { useAuthUserContext } from "../../context";
import { Logo } from "..";

export const HeaderContainerDrawerSidebar: React.FC = () => {
  const { getToken, authUserCurrent } = useAuthUserContext();
  const theme = useTheme();

  const token = useMemo(() => {
    return getToken();
  }, []);

  return(
    <>
      <Box width='100%' height={theme.spacing(20)} display='flex' alignItems='center' justifyContent='center' >
        {token &&
          <Stack spacing={1} alignItems="center" justifyContent="center" display="flex" flex={1}>
            <Avatar 
              sx={{ height: theme.spacing(12), width: theme.spacing(12), ml: 2 }} 
              src={""} 
            />
            <Typography align="center" variant="subtitle2" textTransform="capitalize" >{authUserCurrent?.name}</Typography>
          </Stack>
        }
        {!token &&
          <Box>
            <Logo type="removebgmain"  />
          </Box>
        }
      </Box>
      <Divider />
    </>
  );
};
