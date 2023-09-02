import { useState, useEffect } from "react";
import { 
  IconButton, 
  Tooltip, 
  Box,
  Autocomplete,
  TextField,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import{ Add, Search } from "@mui/icons-material";
import { LoadingSimple } from "../../../../../../components";

export const DeafaultToolbar: React.FC<ITableToolbarDefaultProps> = ({ handleSearch }) => {
  const [searchFiter, setSearchFilter] = useState("");
  const [selectedModalityTypeId, setSelectedModalityTypeId] = useState<number | undefined>(undefined);
  const [modalitiesTypes, setModalitiesTypes] = useState<IModalityType[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  const lgDown = useMediaQuery(theme.breakpoints.down("lg"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setModalitiesTypes([
      { id: 2, type: "Aula",},
      { id: 1, type: "Treino"},
    ]);
    setLoading(false);
  }, []);

  return(
    <Box display="flex" flexDirection="row" sx={{ flex: "1 1 100%" }}>
      <Box alignItems="center" justifyContent="right">
        {!lgDown &&
          <Box mt={3} justifyContent="center" alignItems="center">
            <Button variant="contained" size="large" startIcon={<Add />} sx={{ borderRadius: 3}}>
              Nova Modalidade
            </Button>
          </Box>
        }
      </Box>
      <Box 
        mt={3} 
        flex={1} 
        display="flex" 
        flexDirection="row" 
        alignItems="center"
        justifyContent={lgDown ? "center" : "right" }  
      >
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
              onInputChange={(_, newInputValue) => {
                setSelectedModalityTypeId(modalitiesTypes.find(modalityType => modalityType.type === newInputValue)?.id);
              }}
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
            onChange={(e) => setSearchFilter(e.target.value)}
            sx={{ width: mdDown ? smDown ? 120 : 200 : 250, mx: 1 }}
          />
        </Tooltip>
        <Tooltip title="Pesquisar" placement="top">
          <IconButton onClick={() => handleSearch({ filter: searchFiter, modality_type_id: selectedModalityTypeId }) }>
            <Search />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};
