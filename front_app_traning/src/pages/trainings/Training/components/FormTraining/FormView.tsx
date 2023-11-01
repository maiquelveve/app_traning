import { Box, Stack, TextField, Tooltip, Grid, Typography  } from "@mui/material";

import { useTrainingPageContext } from "../../../../../context";

export const FormView: React.FC<IFormTrainings> = ({ formik, loading }) => {
  const { modalitiesTrainings } = useTrainingPageContext();

  const isFormInInitialState = Object.keys(formik.values).every(
    key => formik.values[key] === formik.initialValues[key]
  );

  const formDataValid = !Object.keys(formik.errors).length;
  
  return(
    <form
      noValidate
      onSubmit={formik.handleSubmit}
    >
      <Box component={Stack} spacing={5} py={5} height={loading ? 232 : "auto"} justifyContent="center">
        {isFormInInitialState ? <Typography>PREENCHA OS CAMPOS DO TREINO</Typography> 
          : !formDataValid ? <Typography>RESOLVA OS ERROS</Typography> :
            <Grid container spacing={2}>
              <Grid container item>
                <Grid item xs={12}>
                  <Tooltip title="Informe a Modalidade" placement="top">
                    <TextField
                      error={!!(formik.touched.training && formik.errors.training)}
                      helperText={formik.touched.training && formik.errors.training}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.training}
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
                      error={!!(formik.touched.tag && formik.errors.tag)}
                      helperText={formik.touched.tag && formik.errors.tag}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.tag}
                      disabled={true}
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
                      error={!!(formik.touched.modality_id && formik.errors.modality_id)}
                      helperText={formik.touched.modality_id && formik.errors.modality_id}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      name="modality_id"
                      fullWidth
                      disabled={true}
                      value={modalitiesTrainings.find(modality => modality.id === formik.values.modality_id)?.modality}
                    />
                  </Tooltip>
                </Grid>
              </Grid>
              <Grid container item>
                <Grid item xs={12}>
                  <Tooltip title="Informe a Modalidade" placement="top">
                    <TextField
                      error={!!(formik.touched.video_url && formik.errors.video_url)}
                      helperText={formik.touched.video_url && formik.errors.video_url}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.video_url}
                      disabled={true}
                      label="Video"
                      name="video_url"
                      fullWidth
                    />
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
        }
      </Box>
    </form> 
  );
};
