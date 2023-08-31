import { useState, useEffect } from "react";
import { 
  Toolbar, 
  Typography, 
  IconButton, 
  Tooltip, 
  Box,
  Autocomplete,
  TextField,
  Button,
  useMediaQuery,
  Stack,
  useTheme,
} from "@mui/material";
import{ Edit, Add, Search, Cancel } from "@mui/icons-material";
import { LoadingSimple } from "../../../../../../components";

export const TableToolbar: React.FC<ITableToolbarProps> = ({ selectedData }) => {
  const [modalitiesTypes, setModalitiesTypes] = useState<IModalityType[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  const lgDown = useMediaQuery(theme.breakpoints.down("lg"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setModalitiesTypes([
      { type: "Aula",},
      { type: "Treino"},
    ]);
    setLoading(false);
  }, []);
  
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(selectedData !== "" && {
          bgcolor: (theme) => theme.palette.primary.main,
        }),
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        mb: 1,
      }}
    >
      {selectedData !== "" ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {selectedData}
        </Typography>
      ) : (
        !lgDown &&
          <Box sx={{ flex: "1 1 100%" }} mt={3} justifyContent="center" alignItems="center">
            <Button variant="contained" size="large" startIcon={<Add />} sx={{ borderRadius: 3}}>
              Nova Modalidade
            </Button>
          </Box>
      )}
      {selectedData !== "" ? (
        <Stack display="flex" flexDirection="row">
          <Tooltip title="Editar">
            <IconButton>
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Desativar">
            <IconButton>
              <Cancel />
            </IconButton>
          </Tooltip>
        </Stack>
      ) : (
        <Box display="flex" flex={1} flexDirection="row" mt={3} justifyContent="center" alignItems="center">
          {lgDown &&
            <Tooltip title="Cadastrar nova da Modalidade" placement="top" >
              <IconButton sx={{ mr: 1 }}>
                <Add color="primary" />
              </IconButton>
            </Tooltip>
          }
          {loading ? 
            <Box mr={2} display="flex" alignItems="center" justifyContent="center">
              <LoadingSimple size={25} /> 
            </Box>
            :
            <Tooltip title="Informe o Tipo da Modalidade" placement="top">
              <Autocomplete
                disablePortal
                id="combo-box-type"
                options={modalitiesTypes.map(modalityType => ({ label: modalityType.type }) )}
                size="small"
                freeSolo
                sx={{ width: mdDown ? smDown ? 80 : 150 : 180 }}
                renderInput={(params) => <TextField {...params} variant="outlined" label="Tipos" />}
              />
            </Tooltip>
          }
          <Tooltip title="Informe a Modalidade" placement="top">
            <TextField
              id="input_modality"
              size="small"
              variant="outlined"
              label="Pesquisar"
              sx={{ width: mdDown ? smDown ? 120 : 200 : 250, mx: 1 }}
            />
          </Tooltip>
          <Tooltip title="Pesquisar" placement="top">
            <IconButton>
              <Search />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Toolbar>
  );
};
