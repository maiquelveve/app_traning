import { Autocomplete, Box, Stack, TextField, Tooltip, Grid  } from "@mui/material";

import { useTrainingPageContext } from "../../../../../context";
import { LoadingSimple } from "../../../../../components";

export const FormTrainingData: React.FC<IFormTrainings> = ({ formik, loading }) => {
  const { modalitiesTrainings, loadingModalitiesTrainings } = useTrainingPageContext();

  return(
    <form
      noValidate
      onSubmit={formik.handleSubmit}
    >
      <Box component={Stack} spacing={5} py={5} height={loading ? 232 : "auto"} justifyContent="center">
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
                  disabled={loading}
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
                  disabled={loading}
                  label="TAG"
                  name="tag"
                  fullWidth
                />
              </Tooltip>
            </Grid>
            <Grid item lg={6} xs={12}>
              {loadingModalitiesTrainings ? 
                <Box mr={2} display="flex" alignItems="center" justifyContent="center">
                  <LoadingSimple size={25} /> 
                </Box>
                :
                <Tooltip title="Informe o Tipo da Modalidade" placement="top">
                  <Autocomplete
                    id="combo-box-type"
                    disablePortal
                    freeSolo
                    fullWidth
                    options={modalitiesTrainings.map(modality => ({ label: modality.modality }) )}
                    onInputChange={(_, newInputValue) => {
                      const modality_id = modalitiesTrainings.find(modality => modality.modality === newInputValue)?.id;
                      formik.setFieldValue("modality_id", modality_id);
                    }}
                    renderInput={(params) => 
                      <TextField 
                        {...params} 
                        variant="outlined" 
                        label="Modalidades" 
                        error={!!(formik.touched.modality_id && formik.errors.modality_id)}
                        helperText={formik.touched.modality_id && formik.errors.modality_id}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        name="modality_id"
                      />}
                  />
                </Tooltip>
              }
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
                  disabled={loading}
                  label="Video"
                  name="video_url"
                  fullWidth
                />
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </form> 
  );
};
