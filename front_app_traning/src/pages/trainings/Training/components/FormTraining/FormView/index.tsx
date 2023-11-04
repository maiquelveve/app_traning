import { Box, Stack, Typography, Card, CardHeader, CardContent, Avatar  } from "@mui/material";
import { green } from "@mui/material/colors";
import {
  DisplaySettings,
  FitnessCenter
} from "@mui/icons-material/";

import { TableListTrainingDetailsView } from "./TableListTrainingDetailsView";
import { FormDataView } from "./FormDataView";

export const FormView: React.FC<IFormViewProps> = ({ data, dataDetails }) => {
  return(
    <Stack spacing={2}>
      <Card elevation={24}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: green[900] }} aria-label="recipe">
              <FitnessCenter />
            </Avatar>
          }
          title="DADOS DO TREINO"
          subheader="Confirma os dados"
        />
        <CardContent>
          <Box component={Stack} spacing={5} height={"auto"} justifyContent="center">
            <FormDataView data={data} />
          </Box>    
        </CardContent>
      </Card>
      
      <Card elevation={24}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: green[900] }} aria-label="recipe">
              <DisplaySettings />
            </Avatar>
          }
          title="DETALHES DO TREINO"
          subheader="Confirma os dados"
        />
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="center">
            {!dataDetails.length ? 
              <Box>
                <Typography variant="button" color="InactiveCaptionText" >Não há Detalhes informado</Typography>
              </Box>  
              :
              <Box>
                <TableListTrainingDetailsView trainingDetails={dataDetails} />
              </Box>
            }
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
};
