import { useState, useCallback } from "react";
import { 
  IconButton, 
  Tooltip, 
  Box,
  TextField,
  Button,
  useMediaQuery,
  useTheme,
  Autocomplete,
} from "@mui/material";
import{ Add, Search } from "@mui/icons-material";
import { LoadingSimple } from "../../../../../../components";

// import { ModalCreate } from "../../../../components";

export const DeafaultToolbar: React.FC = () => {
  const [selectedModalityId, setSelectedModalityId] = useState<number | undefined>(undefined);

  const [trainingSearchFiter, setTrainingSearchFiter] = useState("");
  const [open, setOpen] = useState(false);
  
  const theme = useTheme();

  const lgDown = useMediaQuery(theme.breakpoints.down("lg"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  const handleOpen = useCallback(() => {
    setOpen(true);
    console.log(open);
  }, []);

  // const handleClose = useCallback(() => {
  //   setOpen(false);
  // }, []);


  //MOCK
  const loadingModalities = false;
  const modalities: IModality[] = [
    { id: 1, modality: "MUSCULAÇÃO", modalityType: { id: 1, type: "TRAINING" } },
    { id: 2, modality: "CORRIDA", modalityType: { id: 1, type: "TRAINING" } },
  ];

  return(
    <Box display="flex" flexDirection="row" sx={{ flex: "1 1 100%" }}>
      <Box alignItems="center" justifyContent="right">
        {!lgDown &&
          <Box mt={3} justifyContent="center" alignItems="center">
            <Button onClick={handleOpen} variant="contained" size="large" startIcon={<Add />} sx={{ borderRadius: 3}}>
              Novo Treino
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
          <Tooltip title="Cadastrar novo Treino" placement="top" >
            <IconButton sx={{ mr: 1 }}>
              <Add color="primary" />
            </IconButton>
          </Tooltip>
        }
        {loadingModalities ? 
          <Box mr={2} display="flex" alignItems="center" justifyContent="center">
            <LoadingSimple size={25} /> 
          </Box>
          :
          <Tooltip title="Informe o Tipo da Modalidade" placement="top">
            <Autocomplete
              disablePortal
              id="combo-box-type"
              options={modalities.map(modality => ({ label: modality.modality }) )}
              size="small"
              freeSolo
              onInputChange={(_, newInputValue) => {
                setSelectedModalityId(modalities.find(modality => modality.modality === newInputValue)?.id);
              }}
              sx={{ width: mdDown ? smDown ? 80 : 150 : 180 }}
              renderInput={(params) => <TextField {...params} variant="outlined" label="Modalidades" />}
            />
          </Tooltip>
        }
        <Tooltip title="Informe o Treino" placement="top">
          <TextField
            id="input_training"
            size="small"
            variant="outlined"
            label="Pesquisar"
            onChange={(e) => setTrainingSearchFiter(e.target.value)}
            sx={{ width: mdDown ? smDown ? 120 : 200 : 250, mx: 1 }}
          />
        </Tooltip>
        <Tooltip title="Pesquisar" placement="top">
          <IconButton onClick={() => console.log(trainingSearchFiter, selectedModalityId) }>
            <Search />
          </IconButton>
        </Tooltip>
      </Box>
      
      {/* <ModalCreate handleClose={handleClose} open={open} /> */}
    </Box>
  );
};
