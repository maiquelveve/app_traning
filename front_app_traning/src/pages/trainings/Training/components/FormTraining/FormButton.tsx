import { Box, Button } from "@mui/material";

import { stepsTraining } from "..";
import { LoadingSimple } from "../../../../../components";

export const FormButton: React.FC<IButtonSteppersProps & IButtonActionTraining> = ({ 
  activeStep, 
  loading,
  isValid,
  submitForm,
  handleBack, 
  handleNext, 
}) => {

  return(
    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
      {loading ? 
        <Box mx={3}>
          <LoadingSimple size={30} /> 
        </Box>  
        :
        <>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Voltar
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          {activeStep === stepsTraining.length - 1 ?
            <Button type="submit" onClick={submitForm} disabled={!isValid}>
              SALVAR
            </Button>
            :
            <Button onClick={handleNext}>
              PRÓXIMO
            </Button>
          }
        </>
      }
    </Box>
  );
};
