import { TextField, Box, Tooltip, Autocomplete, Stack } from "@mui/material";

export const FormModalities: React.FC<IFormModalities> = ({ formik, loading, modalitiesTypes }) => {
  return (
    <form
      noValidate
      onSubmit={formik.handleSubmit}
    >
      <Box component={Stack} spacing={5} py={5} height={loading ? 232 : "auto"} justifyContent="center">
        <Tooltip title="Informe a Modalidade" placement="top">
          <TextField
            error={!!(formik.touched.modality && formik.errors.modality)}
            helperText={formik.touched.modality && formik.errors.modality}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.modality}
            disabled={loading}
            label="Modalidades"
            name="modality"
            type="modality"   
            fullWidth
          />
        </Tooltip>
        <Tooltip title="Escolha um Tipo da Modalidade" placement="top">
          <Autocomplete
            freeSolo
            disabled={loading}
            value={formik.values.modality_type} 
            options={modalitiesTypes.map(modalityType => ({ label: modalityType.type }) )}
            onInputChange={(_, newInputValue) => formik.setFieldValue("modality_type", newInputValue) }
            renderInput={(params) => (
              <TextField 
                {...params} 
                label="Tipos" 
                variant="outlined" 
                error={!!(formik.touched.modality_type && formik.errors.modality_type)}
                helperText={formik.touched.modality_type && formik.errors.modality_type}
              />
            )}
          />
        </Tooltip>
      </Box>
    </form>  
  );
};
