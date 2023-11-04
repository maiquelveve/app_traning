import { Tooltip,Table,TableBody,TableContainer,TableHead,TableRow,Paper,IconButton,Box,Grid,Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
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
