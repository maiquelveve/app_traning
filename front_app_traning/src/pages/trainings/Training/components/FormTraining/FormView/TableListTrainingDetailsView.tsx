import { Table,TableBody,TableContainer,TableHead,TableRow,Paper,Box,useTheme,useMediaQuery,Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const TableListTrainingDetailsView: React.FC<ITableListTrainingDetailsViewProps> = ({ trainingDetails }) => {
  const theme = useTheme();
  
  const xl = useMediaQuery(theme.breakpoints.only("xl"));
  const lg = useMediaQuery(theme.breakpoints.only("lg"));
  const md = useMediaQuery(theme.breakpoints.only("md"));
  const sm = useMediaQuery(theme.breakpoints.only("sm"));
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  const sizeTbale = xl ? 1100 : lg ? 1050 : md ? 750 : sm ? 450 : xs ? 340 : 100;
  
  return (
    <Box m={1} >
      <TableContainer sx={{ width: sizeTbale }} component={Paper} >
        <Table size="small" aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Descrição</StyledTableCell>
              <StyledTableCell align="center">Valor</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trainingDetails.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell sx={{ maxWidth: 140 }} component="th" scope="row">
                  <Typography 
                    variant="body2" 
                    textTransform="uppercase" 
                    sx={{ whiteSpace: "pre-line",  wordWrap: "break-word" }} 
                  >
                    {row.description}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell sx={{ maxWidth: 140 }} align="center">
                  <Typography 
                    variant="body2" 
                    textTransform="uppercase" 
                    sx={{ whiteSpace: "pre-line",  wordWrap: "break-word" }} 
                  >
                    {row.value}
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>    
  );
};
