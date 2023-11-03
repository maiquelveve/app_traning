import { Box, Button, Typography } from "@mui/material";
import { useCallback, useMemo, useState } from "react";

import { ModalCreateDetailsTraining } from "./ModalCreateDetailsTraining";
import { TableListTrainingDetails } from "./TableListTrainingDetails";

const TOTAL_DETAILS = 5;

export const FormTrainingDetails: React.FC<IFormTrainingDetailsProps> = ({ 
  handleDeleteDetail, 
  handleSaveDetails, 
  trainingDetails 
}) => {
  const [open, setOpen] = useState(false);
  
  const countDetails = useMemo(() => TOTAL_DETAILS - trainingDetails.length, [trainingDetails]);
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  return(
    <>
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
        <Button 
          sx={{ mb: 1 }} 
          variant="contained" 
          disabled={countDetails <= 0}
          onClick={handleOpen}
        >
          Adicione detalhes/Informação ao treino
        </Button>
        <Typography variant="button">{`Cadastre mais ${countDetails} Detalhes`}</Typography>
        {open && 
          <ModalCreateDetailsTraining handleClose={handleClose} open={open} handleSaveTrainingDateils={handleSaveDetails} />
        }
      </Box>
      {!!trainingDetails.length && 
        <Box mt={5}>
          <TableListTrainingDetails handleDeleteDetail={handleDeleteDetail} trainingDetails={trainingDetails} />
        </Box>
      }
    </>
  );
};
