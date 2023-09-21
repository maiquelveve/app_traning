import { useState, useEffect, useCallback } from "react";
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

import { useModalitiesPageContext, useAuthUserContext } from "../../../../../../context";
import { LoadingSimple, catchDefalutAlert } from "../../../../../../components";
import { ModalCreate } from "../../../../components";
import { modalitiesTypesConversion } from "../../../../../../utils";
import { apiService } from "../../../../../../services";

export const DeafaultToolbar: React.FC = () => {
  const [selectedModalityTypeId, setSelectedModalityTypeId] = useState<number | undefined>(undefined);
  const [modalitiesTypes, setModalitiesTypes] = useState<IModalityType[]>([]);
  const [searchFiter, setSearchFilter] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const { handleSearch } = useModalitiesPageContext();
  const { isRootProfiles } = useAuthUserContext();
  const theme = useTheme();

  const lgDown = useMediaQuery(theme.breakpoints.down("lg"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    try {
      const fetch = async () => {
        const response = await apiService.get<IReturnedRequest>("/modalitiesTypes");
        const data = response.data.data[0].modalitiesTypes.map((modality:  IModalityType): IModalityType => {
          return {
            type: modalitiesTypesConversion(modality.type),
            id: modality.id
          };
        }); 
        setModalitiesTypes(data);
      };
      fetch();

    } catch (error) {
      catchDefalutAlert();

    } finally {
      setLoading(false);
    }
  }, []);

  return(
    <Box display="flex" flexDirection="row" sx={{ flex: "1 1 100%" }}>
      <Box alignItems="center" justifyContent="right">
        {(!lgDown && isRootProfiles) &&
          <Box mt={3} justifyContent="center" alignItems="center">
            <Button onClick={handleOpen} variant="contained" size="large" startIcon={<Add />} sx={{ borderRadius: 3}}>
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
        {(lgDown && isRootProfiles) &&
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
      
      <ModalCreate handleClose={handleClose} open={open} />
    </Box>
  );
};
