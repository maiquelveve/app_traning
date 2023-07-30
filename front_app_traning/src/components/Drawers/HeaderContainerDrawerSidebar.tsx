import { useMemo } from "react";
import { Avatar, Box, Divider, useTheme } from "@mui/material";

import { useAuthUserContext } from "../../context";
import { Logo } from "..";

export const HeaderContainerDrawerSidebar: React.FC = () => {
  const { getToken } = useAuthUserContext();
  const theme = useTheme();

  const token = useMemo(() => {
    return getToken();
  }, []);

  return(
    <>
      <Box width='100%' height={theme.spacing(20)} display='flex' alignItems='center' justifyContent='center' >
        {token &&
          <Avatar 
            sx={{ height: theme.spacing(12), width: theme.spacing(12) }} 
            src={""} 
          />
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
