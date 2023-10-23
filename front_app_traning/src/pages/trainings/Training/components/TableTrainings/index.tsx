import { useState, useCallback } from "react";
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

import { TableEmpty } from "./TableEmpty";
import { TableToolbar } from "./TableToolbar";

export const TableTrainings: React.FC = () => {
  const [selected, setSelected] = useState<ITrainingListData | null>(null);

  const { themeCurrent } = useLayoutContext();

  const handleDisableSelectedData = useCallback(() => {
    setSelected(null);
  }, []);



  //MOCKS
  const loadingTrainings = false;
  const trainings: ITrainingListData[] = [
    { id: 1, traning: "SUPINO RETO", tag: "PEITORAL", modality: "MUSCULAÇÃO" },
    { id: 2, traning: "ROSCA DIRETA", tag: "BISCEPS", modality: "MUSCULAÇÃO" },
    { id: 3, traning: "CORRIDA 12 MINUTOS", tag: "RESISTENCIA", modality: "CORRIDA" },
    { id: 4, traning: "CORRE E PARA", tag: "GÁS", modality: "CORRIDA" },
  ];


  return (
    <Box sx={{ width: "100%" }} component={Paper} elevation={24} borderRadius={5}>
      <Box component={Stack} spacing={5}>
        <TableToolbar selectedData={selected} disableSelectedData={handleDisableSelectedData} />
        {loadingTrainings ? 
          <Box display="flex" justifyContent="center" alignItems="center" height={350}>
            <LoadingText text="Aguarde! Carregando os treinos..." size={50} /> 
          </Box>
          : 
          <Box>
            {!trainings.length ? <TableEmpty /> :
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
                          TREINO
                        </TableCell>
                        <TableCell
                          align={"left"}
                          padding={"normal"}
                        >
                          TAG
                        </TableCell>
                        <TableCell
                          align={"left"}
                          padding={"normal"}
                        >
                          MODALIDADE
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {trainings.map((training) => (
                        <TableRow
                          hover
                          onClick={() => training.id !== selected?.id ? setSelected(training) : setSelected(null)}
                          key={training.id}
                          selected={selected?.id === training.id  ? true : false}
                          sx={{ cursor: "pointer" }}
                          style={{
                            backgroundColor: (themeCurrent === "dark")  ? 
                              selected?.id === training.id ? green[400] : "inherit"
                              : 
                              selected?.id === training.id ? alpha("#078D03", 0.12) : "inherit"
                          }}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox color="primary" checked={selected?.id === training.id ? true : false} />
                          </TableCell>
                          <TableCell align="left">{training.traning}</TableCell>
                          <TableCell align="left">{training.tag}</TableCell>
                          <TableCell align="left">{training.modality}</TableCell>
                        </TableRow> 
                      ))}
                    </TableBody>          
                  </Table>
                </TableContainer>
                {/* <TableFooter /> */}
              </>
            }
          </Box>
        }
      </Box>
    </Box>
  );
};
