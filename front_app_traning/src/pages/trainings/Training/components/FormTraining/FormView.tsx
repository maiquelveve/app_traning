import { Box, Stack, TextField, Tooltip, Grid  } from "@mui/material";

import { useTrainingPageContext } from "../../../../../context";

export const FormView: React.FC<IFormViewProps> = ({ data, dataDetails }) => {
  const { modalitiesTrainings } = useTrainingPageContext();
  console.log(dataDetails);
  
  return(
    <Box component={Stack} spacing={5} py={5} height={"auto"} justifyContent="center">
      <Grid container spacing={2}>
        <Grid container item>
          <Grid item xs={12}>
            <Tooltip title="Informe a Modalidade" placement="top">
              <TextField
                value={data.training}
                disabled={true}
                label="Treino"
                name="training"
                fullWidth
              />
            </Tooltip>
          </Grid>
        </Grid>
        <Grid container item spacing={2}>
          <Grid item lg={6} xs={12}>
            <Tooltip title="Informe a Modalidade" placement="top">
              <TextField
                disabled={true}
                value={data.tag}
                label="TAG"
                name="tag"
                fullWidth
              />
            </Tooltip>
          </Grid>
          <Grid item lg={6} xs={12}>
            <Tooltip title="Informe o Tipo da Modalidade" placement="top">
              <TextField 
                variant="outlined" 
                label="Modalidades" 
                name="modality_id"
                fullWidth
                disabled={true}
                value={modalitiesTrainings.find(modality => modality.id === Number(data.modality_id))?.modality}
              />
            </Tooltip>
          </Grid>
        </Grid>
        <Grid container item>
          <Grid item xs={12}>
            <Tooltip title="Informe a Modalidade" placement="top">
              <TextField
                disabled={true}
                value={data.video_url}
                label="Video"
                name="video_url"
                fullWidth
              />
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
