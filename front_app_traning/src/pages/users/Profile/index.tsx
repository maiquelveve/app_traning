import { Box, CardContent, Grid } from "@mui/material";

import { useAuthUserContext } from "../../../context";
import { CardComponent, LoadingText, Page } from "../../../components";
import { AccountProfile, FormProfile } from "./components";

export const Profile: React.FC = () => {
  const { authUserCurrent } = useAuthUserContext();

  return(
    <Page title="Perfil">
      <Grid
        container
        spacing={7}
        component={Box}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          item
          xs={12}
          lg={4}
        >
          {!authUserCurrent ? 
            <CardComponent>
              <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                <CardContent>
                  <Box
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      flexDirection: "column"
                    }}
                  >
                    <LoadingText /> 
                  </Box>
                </CardContent>
              </Box>
            </CardComponent>
            : 
            <AccountProfile /> 
          }
        </Grid>
        <Grid
          item
          xs={12}
          lg={8}
        >
          {!authUserCurrent ? 
            <CardComponent>
              <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                <CardContent>
                  <Box
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      flexDirection: "column"
                    }}
                  >
                    <LoadingText /> 
                  </Box>
                </CardContent>
              </Box>
            </CardComponent>
            : 
            <FormProfile />
          }
        </Grid>
      </Grid>
    </Page>
  );
};
