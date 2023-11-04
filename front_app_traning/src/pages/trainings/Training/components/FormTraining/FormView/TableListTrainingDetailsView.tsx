import { Table, TableBody, TableContainer, TableHead, TableRow, Paper, Box } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

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

export const TableListTrainingDetailsView: React.FC<ITableListTrainingDetailsViewProps> = ({ trainingDetails }) => (
  <Box m={1} >
    <TableContainer sx={{ width: 900 }} component={Paper} >
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
              <StyledTableCell component="th" scope="row">
                {row.description}
              </StyledTableCell>
              <StyledTableCell align="center">{row.value}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>    
);
