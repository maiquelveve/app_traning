import { Avatar, Box, Button, CardActions, CardContent, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";

import { useAuthUserContext } from "../../../../../context";
import { CardComponent, } from "../../../../../components";

import { analysisProfiles } from "../../../../../utils";
import { namesSplits } from "../../../../../utils";

export const AccountProfile: React.FC = () => {
  const { profilesUsersCurrent, authUserCurrent } = useAuthUserContext();
  
  const { getInputProps, getRootProps, acceptedFiles, fileRejections } = useDropzone({ 
    maxFiles: 1,
    accept: {
      "image/jpeg": [".jpeg", ".png"]
    }
  });

  const acceptedFileItems = acceptedFiles.map(file => (
    <li key={file.name}>{file.name}</li>
  ));

  const fileRejectionItems = fileRejections.map(({file}) => (
    <li key={file.name}>{file.name}</li>
  ));



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
          <Button
            {...getRootProps({className: "dropzone"})}
            fullWidth
            variant="text"
          >
            Enviar Imagem
            <input {...getInputProps()} />
          </Button>
        </CardActions>
        <Box>
          <Box>Arquivos aceitos {acceptedFileItems}</Box>
          <Box>Arquivos regeitados {fileRejectionItems}</Box>
        </Box>
      </Box>
    </CardComponent>
  );
};
