import { 
  Typography, 
  IconButton, 
  Tooltip, 
  Stack,
} from "@mui/material";
import{ Edit, Cancel } from "@mui/icons-material";

export const SelectedToobar: React.FC<ITableToolbarSelectedProps> = ({ selectedData, handleDeactivate, handleEdit }) => {
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
      <Stack display="flex" flexDirection="row">
        <Tooltip title="Editar">
          <IconButton 
            onClick={() => 
              handleEdit({ modalityCurrent: selectedData as IModality })
            }
          >
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Desativar">
          <IconButton onClick={() => handleDeactivate({ modalityCurrent: selectedData as IModality })}>
            <Cancel />
          </IconButton>
        </Tooltip>
      </Stack>
    </>
  );
};
