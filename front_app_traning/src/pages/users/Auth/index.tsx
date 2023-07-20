import { Grid, Box, Zoom, Fade } from "@mui/material";

import { FormSignIn, FormSignUp, FormPasswordReset, ImageSide } from "./components";

import { useAuthPageContext } from "../../../context";

export const Auth: React.FC = () => {
  const { showFormSignIn, showFormSignUp, showFormPassword } = useAuthPageContext();
  
  return (
    <Grid
      container
      sx={{ flex: "1 1 auto" }}
    >
      <Grid
        item
        xs={12}
        lg={6}
        sx={{
          backgroundColor: "background.paper",
          display: "flex",
          flexDirection: "column",
          position: "relative"
        }}
      >
        {showFormSignIn && 
          <Zoom in={showFormSignIn} timeout={{ enter: 2000, exit: 3000  }} >
            <Box>
              <FormSignIn />
            </Box>
          </Zoom>
        }

        {showFormSignUp && 
          <Zoom in={showFormSignUp} timeout={{ enter: 2000, exit: 3000 }}>
            <Box>
              <FormSignUp />
            </Box>
          </Zoom>
        }

        {showFormPassword && 
          <Zoom in={showFormPassword} timeout={{ enter: 2000, exit: 3000 }}>
            <Box>
              <FormPasswordReset />
            </Box>
          </Zoom>
        }
      </Grid>
      <Grid
        item
        xs={12}
        lg={6}
        sx={{
          alignItems: "center",
          background: "radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)",
          color: "white",
          display: "flex",
          justifyContent: "center",
          "& img": {
            maxWidth: "100%"
          }
        }}
      >
        <Fade in={true} timeout={{ enter: 2500 }}>
          <Box>
            <ImageSide />
          </Box>
        </Fade>
      </Grid>
    </Grid>
  );
};
