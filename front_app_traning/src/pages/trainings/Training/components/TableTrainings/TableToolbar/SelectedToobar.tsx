import { useCallback, useState } from "react";
import { 
  Typography, 
  IconButton, 
  Tooltip, 
  Stack,
} from "@mui/material";
import{ Edit } from "@mui/icons-material";

// import { ModalUpdate } from "../../../../components";
import { useAuthUserContext } from "../../../../../../context";

export const SelectedToobar: React.FC<ITableToolbarSelectedTrainingProps> = ({ selectedData, disableSelectedData }) => {
  const [open, setOpen] = useState(false);
  
  const { isRootProfiles } = useAuthUserContext();

  const handleOpen = useCallback(() => {
    setOpen(true);
    console.log(open);
    console.log(disableSelectedData);
  }, []);
  
  // const handleClose = useCallback(() => {
  //   disableSelectedData();
  //   setOpen(false);
  // }, []);

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
      {/* {open && 
        <ModalUpdate handleClose={handleClose} open={open} selectedModality={selectedData!} />
      } */}
    </>
  );
};
