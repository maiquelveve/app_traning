import { useState } from "react";
import { Avatar, Box, CardActions, CardContent, Typography } from "@mui/material";

import { useAuthUserContext } from "../../../../../context";
import { CardComponent, UploadFilesImg, catchDefalutAlert, defaultAlert } from "../../../../../components";

import { analysisProfiles } from "../../../../../utils";
import { namesSplits } from "../../../../../utils";
import { apiService } from "../../../../../services";

export const AccountProfile: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { profilesUsersCurrent, authUserCurrent, getToken, setAuthUserCurrent } = useAuthUserContext();
  
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

  const handleSaveFlie = async (file: File) => {
    setIsLoading(true);
    try {
      const token = getToken();
      const data = new FormData();
      data.append("file", file);
      
      const response = await apiService.post<IReturnedRequest>(
        "/users/uploadImgProfile", 
        data, 
        { 
          headers: { 
            Authorization: token 
          } 
        }
      );

      if(response.data.isSuccess) {
        setAuthUserCurrent(response.data.data[0].user);
        defaultAlert({ messages:["Usuário atualizado com sucesso!"], type: "success", position: "top-end" });
        
      } else {
        defaultAlert({ messages: response.data.errors, type: "error", position: "top-end" });
      }

    } catch (error) {
      catchDefalutAlert();

    } finally {
      setIsLoading(false);
    }
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
          <UploadFilesImg onSaveFile={handleSaveFlie} isLoading={isLoading} />
        </CardActions>
      </Box>
    </CardComponent>
  );
};
