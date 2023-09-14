import { 
  Typography, 
  IconButton, 
  Tooltip, 
  Stack,
} from "@mui/material";
import{ Edit, DeleteForever } from "@mui/icons-material";

import { useAuthUserContext } from "../../../../../../context";

export const SelectedToobar: React.FC<ITableToolbarSelectedProps> = ({ selectedData }) => {
  const { isRootProfiles } = useAuthUserContext();

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
      }
    </>
  );
};
