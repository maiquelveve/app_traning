import { Cancel } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";

export const FormDataErrors: React.FC<IFormDataErrorsProps> = ({ errors }) => {  
  return(
    <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
      <Box mb={5}>
        <Typography variant="button" fontSize={18}>Ocorram alguns erros</Typography>
      </Box>
      <Box component={Stack} spacing={1} display="flex" alignItems="center">
        {Object.values(errors).map((error: any, index) => (
          <Box flexDirection="row" display="flex" alignItems="center" justifyContent="flex-start" key={index}>
            <IconButton>
              <Cancel sx={{ color: "red" }} />
            </IconButton>
            <Typography color="red" >{error}*</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
