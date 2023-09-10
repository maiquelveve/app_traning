import { 
  Typography, 
  IconButton, 
  Tooltip, 
  Stack,
} from "@mui/material";
import{ Edit, DeleteForever } from "@mui/icons-material";

export const SelectedToobar: React.FC<ITableToolbarSelectedProps> = ({ selectedData }) => {
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
            onClick={() => {}}
          >
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Desativar">
          <IconButton onClick={() => {}}>
            <DeleteForever />
          </IconButton>
        </Tooltip>
      </Stack>
    </>
  );
};
