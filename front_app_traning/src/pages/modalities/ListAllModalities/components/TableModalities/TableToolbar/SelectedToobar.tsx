import { useCallback, useState } from "react";
import { 
  Typography, 
  IconButton, 
  Tooltip, 
  Stack,
} from "@mui/material";
import{ Edit } from "@mui/icons-material";

import { ModalUpdate } from "../../../../components";
import { useAuthUserContext } from "../../../../../../context";

export const SelectedToobar: React.FC<ITableToolbarSelectedProps> = ({ selectedData }) => {
  const [open, setOpen] = useState(false);
  
  const { isRootProfiles } = useAuthUserContext();

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return(
    <>
      <Typography
        sx={{ flex: "1 1 100%" }}
        color="inherit"
        variant="subtitle1"
        component="div"
      >
        {selectedData!.modality}
      </Typography>
      {isRootProfiles &&
        <Stack display="flex" flexDirection="row">
          <Tooltip title="Editar">
            <IconButton 
              onClick={handleOpen}
            >
              <Edit />
            </IconButton>
          </Tooltip>
        </Stack>
      }
      {open && 
        <ModalUpdate handleClose={handleClose} open={open} selectedModality={selectedData!} />
      }
    </>
  );
};
