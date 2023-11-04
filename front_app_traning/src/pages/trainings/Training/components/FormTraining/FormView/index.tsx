import { Box, Stack, Typography  } from "@mui/material";

import { TableListTrainingDetailsView } from "./TableListTrainingDetailsView";
import { FormDataView } from "./FormDataView";

export const FormView: React.FC<IFormViewProps> = ({ data, dataDetails }) => {
  return(
    <>
      <Box component={Stack} spacing={5} py={5} height={"auto"} justifyContent="center">
        <FormDataView data={data} />
      </Box>
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
    </>
  );
};
