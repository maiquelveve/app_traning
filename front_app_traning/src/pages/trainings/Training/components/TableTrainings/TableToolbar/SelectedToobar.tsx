import { useCallback, useState } from "react";
import { 
  Typography, 
  IconButton, 
  Tooltip, 
  Stack,
} from "@mui/material";
import{ Edit, Visibility } from "@mui/icons-material";

import { ModalView } from "../../ModalView";
import { useAuthUserContext } from "../../../../../../context";

export const SelectedToobar: React.FC<ITableToolbarSelectedTrainingProps> = ({ selectedData, disableSelectedData }) => {
  const [openView, setOpenView] = useState(false);
  
  const { isTrainerProfiles } = useAuthUserContext();

  const handleOpen = useCallback(() => {
    setOpenView(true);
  }, []);
  
  const handleCloseView = useCallback(() => {
    disableSelectedData();
    setOpenView(false);
  }, []);

  return(
    <>
      <Typography
        sx={{ flex: "1 1 100%" }}
        color="inherit"
        variant="subtitle1"
        component="div"
      >
        {selectedData!.training}
      </Typography>
      {isTrainerProfiles &&
        <Stack display="flex" flexDirection="row">
          <Tooltip title="Editar">
            <IconButton 
              onClick={handleOpen}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Visualizar">
            <IconButton 
              onClick={handleOpen}
            >
              <Visibility />
            </IconButton>
          </Tooltip>
        </Stack>
      }
      {openView && 
        <ModalView handleClose={handleCloseView} open={openView} id={selectedData!.id} />
      }
    </>
  );
};
