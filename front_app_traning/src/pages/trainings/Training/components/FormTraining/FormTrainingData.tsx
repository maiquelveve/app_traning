import { Autocomplete, Box, Stack, TextField, Tooltip } from "@mui/material";

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
        {loadingModalitiesTrainings ? 
          <Box mr={2} display="flex" alignItems="center" justifyContent="center">
            <LoadingSimple size={25} /> 
          </Box>
          :
          <Tooltip title="Informe o Tipo da Modalidade" placement="top">
            <Autocomplete
              disablePortal
              id="combo-box-type"
              options={modalitiesTrainings.map(modality => ({ label: modality.modality }) )}
              freeSolo
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
      </Box>
    </form> 
  );
};
