import { useCallback, useState } from "react";
import { 
  Typography, 
  IconButton, 
  Tooltip, 
  Stack,
} from "@mui/material";
import{ Edit, Visibility } from "@mui/icons-material";

import { ModalView, ModalUpdate } from "../../";
import { useAuthUserContext } from "../../../../../../context";

export const SelectedToobar: React.FC<ITableToolbarSelectedTrainingProps> = ({ selectedData, disableSelectedData }) => {
  const [openView, setOpenView] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  
  const { isTrainerProfiles } = useAuthUserContext();

  const handleOpenView = useCallback(() => {
    setOpenView(true);
  }, []);
  
  const handleCloseView = useCallback(() => {
    setOpenView(false);
  }, []);

  const handleOpenUpdate = useCallback(() => {
    setOpenUpdate(true);
  }, []);
  
  const handleCloseUpdate = useCallback(() => {
    disableSelectedData();
    setOpenUpdate(false);
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
              onClick={handleOpenUpdate}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Visualizar">
            <IconButton 
              onClick={handleOpenView}
            >
              <Visibility />
            </IconButton>
          </Tooltip>
        </Stack>
      }
      {openView && 
        <ModalView handleClose={handleCloseView} open={openView} id={selectedData!.id} />
      }
      {openUpdate && 
        <ModalUpdate handleClose={handleCloseUpdate} open={openUpdate} id={selectedData!.id} />
      }
    </>
  );
};
