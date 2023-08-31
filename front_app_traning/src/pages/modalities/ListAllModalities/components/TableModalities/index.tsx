import { useState } from "react";
import { 
  Pagination, 
  Table, 
  TableBody,
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Toolbar, 
  Typography, 
  Paper, 
  Checkbox, 
  IconButton, 
  Tooltip, 
  Box,
  Autocomplete,
  TextField,
  MenuItem,
  Select,
  Button,
  useMediaQuery,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

import { useLayoutContext } from "../../../../../context";
interface Data {
  calories: string;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

function createData(
  name: string,
  calories: string,
  fat: number,
  carbs: number,
  protein: number,
): Data {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

const rows = [
  createData("Cupcake","Treino", 3.7, 67, 4.3),
  createData("Donut","Treino", 25.0, 51, 4.9),
  createData("Eclair","Treino", 16.0, 24, 6.0),
  createData("Frozen yoghurt","Treino", 6.0, 24, 4.0),
  createData("Gingerbread","Treino", 16.0, 49, 3.9),
  createData("Honeycomb","Treino", 3.2, 87, 6.5),
  createData("Ice cream sandwich","Treino", 9.0, 37, 4.3),
  createData("Jelly Bean","Treino", 0.0, 94, 0.0),
  createData("KitKat","Treino", 26.0, 65, 7.0),
];

function TableToolbar({ selectedData }: { selectedData: string }) {
  const theme = useTheme();

  const lgDown = useMediaQuery(theme.breakpoints.down("lg"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  const top100Films = [
    { label: "Aula",},
    { label: "Treino"},
  ];

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
        mt: 2,
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
            <Button variant="contained" size="large" startIcon={<AddIcon />}>
              Nova Modalidade
            </Button>
          </Box>
      )}
      {selectedData !== "" ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Box display="flex" flex={1} flexDirection="row" mt={3} justifyContent="center" alignItems="center">
          {lgDown &&
            <Tooltip title="Cadastrar nova da Modalidade" placement="top" >
              <IconButton sx={{ mr: 1 }}>
                <AddIcon color="primary" />
              </IconButton>
            </Tooltip>
          }
          <Tooltip title="Informe o Tipo da Modalidade" placement="top">
            <Autocomplete
              disablePortal
              id="combo-box-type"
              options={top100Films}
              size="small"
              freeSolo
              sx={{ width: mdDown ? smDown ? 80 : 150 : 180 }}
              renderInput={(params) => <TextField {...params} variant="outlined" label="Tipos" />}
            />
          </Tooltip>
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
              <SearchIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Toolbar>
  );
}

export const TableModalities: React.FC = () => {
  const [selected, setSelected] = useState<string>("");

  const { themeCurrent } = useLayoutContext();
  const theme = useTheme();

  const lgDown = useMediaQuery(theme.breakpoints.down("lg"));
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ width: "100%" }} component={Paper} elevation={24} borderRadius={5}>
      <TableToolbar selectedData={selected} />
      <TableContainer>
        <Table
          sx={{ minWidth: 350 }}
          aria-labelledby="tableTitle"
          size={"medium"}
        >
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
            {rows.map((row) => (
              <TableRow
                hover
                onClick={() => row.name !== selected ? setSelected(row.name) : setSelected("")}
                key={row.name}
                selected={selected === row.name  ? true : false}
                sx={{ cursor: "pointer" }}
                style={{
                  backgroundColor: (themeCurrent === "dark")  ? 
                    selected === row.name ? green[400] : "inherit"
                    : 
                    selected === row.name ? alpha("#078D03", 0.12) : "inherit"
                }}
              >
                <TableCell padding="checkbox">
                  <Checkbox color="primary" checked={selected === row.name ? true : false} />
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="center">{row.calories}</TableCell>
              </TableRow> 
            ))}
          </TableBody>          
        </Table>
      </TableContainer>
      <Box 
        py={2} 
        mx={3} 
        display="flex" 
        flexDirection="row"
        alignItems="center" 
        justifyContent={lgDown ? "center" : "right"} 
      >
        {!smDown &&
          <Typography
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            Registros
          </Typography>
        }        
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={5}
          onChange={() => { console.log("oi"); }}
          autoWidth
          variant="standard"
          size="small"
          sx={{ mx: 2 }}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={90}>90</MenuItem>
        </Select>
        <Pagination count={10} color="primary" size="small" />
      </Box>
    </Box>
  );
};
