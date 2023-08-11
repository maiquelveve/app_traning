import { Avatar, Box, CardActions, CardContent, Typography } from "@mui/material";

import { useAuthUserContext } from "../../../../../context";
import { CardComponent, UploadFilesImg, } from "../../../../../components";

import { analysisProfiles } from "../../../../../utils";
import { namesSplits } from "../../../../../utils";

export const AccountProfile: React.FC = () => {
  const { profilesUsersCurrent, authUserCurrent } = useAuthUserContext();
  
  const textProfiles = () => {
    const profiles = analysisProfiles({ usersProfiles: profilesUsersCurrent });
    
    const root = profiles.isRootProfiles ? "ADMINISTRADOR" : undefined;
    const trainer = profiles.isTrainerProfiles ? "TREINADOR" : undefined;
    const user = profiles.isUserProfiles ? "ALUNO" : undefined;

    if(root && trainer){
      return `${root} | ${trainer}`;
    }

    if(root) {
      return root;
    }

    if(trainer) {
      return trainer;
    }

    return user;
  };

  const handleSaveFlie = (file: File) => {
    console.log(file);
  };

  return(
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
            <Avatar
              src={authUserCurrent?.avatar_url}
              sx={{
                height: 80,
                mb: 2,
                width: 80
              }}
            /> 
            
            <Typography
              gutterBottom
              variant="h5"
              textTransform="capitalize"
            >
              {namesSplits(authUserCurrent ? authUserCurrent.name : "")}
            </Typography>
            <Typography
              color="text.secondary"
              variant="body2"
            >
              {textProfiles()}
            </Typography>
          </Box>
        </CardContent>
        <CardActions>
          <UploadFilesImg onSaveFile={handleSaveFlie} />
        </CardActions>
      </Box>
    </CardComponent>
  );
};
