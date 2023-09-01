import { useCallback, useEffect, useState } from "react";
import { 
  Table, 
  TableBody,
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Checkbox, 
  Box,
  Stack,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { green } from "@mui/material/colors";

import { useLayoutContext } from "../../../../../context";
import { LoadingText } from "../../../../../components";

import { TableToolbar } from "./TableToolbar";
import { TableFooter } from "./TableFooter";
import { TableEmpty } from "./TableEmpty";

export const TableModalities: React.FC = () => {
  const [selected, setSelected] = useState<IModality | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalities, setModalities] = useState<IModality[]>([]);

  const handleEdit = useCallback(({ modalityCurrent }: THandleToolbarSelectedProps): void => { 
    console.log(modalityCurrent); 
  }, []);

  const handleDeactivate = useCallback(({ modalityCurrent }: THandleToolbarSelectedProps): void => { 
    console.log(modalityCurrent); 
  }, []);

  const handleSerch = useCallback(({ filter, modality_type_id }: THandleSerchToolbarDefaultProps): IModality[] => { 
    console.log(filter); 
    console.log(modality_type_id); 
    return [];
  }, []);

  useEffect(() => {
    setModalities([
      { id: 1, name: "Musculação", type: "treino"}, 
      { id: 2, name: "Pilates", type: "Aula"}
    ]);
    setLoading(false);
  }, []);

  const { themeCurrent } = useLayoutContext();

  return (
    <Box sx={{ width: "100%" }} component={Paper} elevation={24} borderRadius={5}>
      {loading ? 
        <Box display="flex" justifyContent="center" alignItems="center" height={350}>
          <LoadingText text="Aguarde! Carregando as modalidades..." size={50} /> 
        </Box>
        : 
        <Box component={Stack} spacing={5}>
          <TableToolbar 
            selectedData={selected}  
            handleDeactivate={handleDeactivate} 
            handleEdit={handleEdit}
            handleSerch={handleSerch}
          />
          {!modalities.length ? <TableEmpty /> :
            <Box>
              <TableContainer>
                <Table sx={{ minWidth: 350 }} aria-labelledby="tableModalities">
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox"></TableCell>
                      <TableCell
                        align={"left"}
                        padding={"normal"}
                      >
                        MODALIDADE
                      </TableCell>
                      <TableCell
                        align={"center"}
                        padding={"normal"}
                      >
                        TIPO
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {modalities.map((modality) => (
                      <TableRow
                        hover
                        onClick={() => modality.name !== selected?.name ? setSelected(modality) : setSelected(null)}
                        key={modality.name}
                        selected={selected?.name === modality.name  ? true : false}
                        sx={{ cursor: "pointer" }}
                        style={{
                          backgroundColor: (themeCurrent === "dark")  ? 
                            selected?.name === modality.name ? green[400] : "inherit"
                            : 
                            selected?.name === modality.name ? alpha("#078D03", 0.12) : "inherit"
                        }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox color="primary" checked={selected?.name === modality.name ? true : false} />
                        </TableCell>
                        <TableCell align="left">{modality.name}</TableCell>
                        <TableCell align="center">{modality.type}</TableCell>
                      </TableRow> 
                    ))}
                  </TableBody>          
                </Table>
              </TableContainer>
              <TableFooter />
            </Box>
          }          
        </Box>
      }
    </Box>
  );
};
