import { Tooltip, Table, TableBody, TableContainer, TableHead, TableRow, Paper, IconButton, Box, Grid } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";

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

export const TableListTrainingDetails: React.FC<ITableListTrainingDetailsProps> = ({ trainingDetails, handleDeleteDetail }) => (
  <Grid container display="flex" justifyContent="center" alignItems="center">
    {trainingDetails.map((row, index) => (
      <Box key={index} m={1} component={Paper} elevation={24}>
        <Grid item lg={3} xs={12}>
          <TableContainer sx={{ width: 360 }} component={Paper} >
            <Table size="small" aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Descrição</StyledTableCell>
                  <StyledTableCell align="center">Valor</StyledTableCell>
                  <StyledTableCell align="right">Ações</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {row.description}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.value}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Tooltip title="CANCELAR" placement="top">
                      <IconButton aria-label="delete" onClick={ () => handleDeleteDetail({ index }) }>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Box>
    ))}
  </Grid>
);
