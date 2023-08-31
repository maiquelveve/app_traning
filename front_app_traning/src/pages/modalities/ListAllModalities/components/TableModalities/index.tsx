import { useEffect, useState } from "react";
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
  const [selected, setSelected] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [modalities, setModalities] = useState<IModality[]>([]);

  useEffect(() => {
    setModalities([
      { name: "Musculação", type: "treino"}, 
      { name: "Pilates", type: "Aula"}
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
          <TableToolbar selectedData={selected} />
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
                        onClick={() => modality.name !== selected ? setSelected(modality.name) : setSelected("")}
                        key={modality.name}
                        selected={selected === modality.name  ? true : false}
                        sx={{ cursor: "pointer" }}
                        style={{
                          backgroundColor: (themeCurrent === "dark")  ? 
                            selected === modality.name ? green[400] : "inherit"
                            : 
                            selected === modality.name ? alpha("#078D03", 0.12) : "inherit"
                        }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox color="primary" checked={selected === modality.name ? true : false} />
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
