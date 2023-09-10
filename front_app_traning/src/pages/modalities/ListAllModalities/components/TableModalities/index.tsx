import { useState } from "react";
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

import { useLayoutContext, useModalitiesPageContext } from "../../../../../context";
import { LoadingText } from "../../../../../components";

import { modalitiesTypesConversion } from "../../../../../utils";

import { TableToolbar } from "./TableToolbar";
import { TableFooter } from "./TableFooter";
import { TableEmpty } from "./TableEmpty";

export const TableModalities: React.FC = () => {
  const [selected, setSelected] = useState<IModality | null>(null);

  const { modalities, loadingModalities } = useModalitiesPageContext();
  const { themeCurrent } = useLayoutContext();

  return (
    <Box sx={{ width: "100%" }} component={Paper} elevation={24} borderRadius={5}>
      <Box component={Stack} spacing={5}>
        <TableToolbar selectedData={selected} />
        {loadingModalities ? 
          <Box display="flex" justifyContent="center" alignItems="center" height={350}>
            <LoadingText text="Aguarde! Carregando as modalidades..." size={50} /> 
          </Box>
          : 
          <Box>
            {!modalities.length ? <TableEmpty /> :
              <>
                <TableContainer sx={{ mb: 1 }}>
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
                          onClick={() => modality.modality !== selected?.modality ? setSelected(modality) : setSelected(null)}
                          key={modality.modality}
                          selected={selected?.modality === modality.modality  ? true : false}
                          sx={{ cursor: "pointer" }}
                          style={{
                            backgroundColor: (themeCurrent === "dark")  ? 
                              selected?.modality === modality.modality ? green[400] : "inherit"
                              : 
                              selected?.modality === modality.modality ? alpha("#078D03", 0.12) : "inherit"
                          }}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox color="primary" checked={selected?.modality === modality.modality ? true : false} />
                          </TableCell>
                          <TableCell align="left">{modality.modality}</TableCell>
                          <TableCell align="center">{modalitiesTypesConversion(modality.modalityType.type)}</TableCell>
                        </TableRow> 
                      ))}
                    </TableBody>          
                  </Table>
                </TableContainer>
                <TableFooter />
              </>
            }
          </Box>
        }
      </Box>
    </Box>
  );
};
