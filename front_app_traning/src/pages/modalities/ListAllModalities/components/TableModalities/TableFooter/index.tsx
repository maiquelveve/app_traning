import { 
  Pagination, 
  Typography, 
  Box,
  MenuItem,
  Select,
  useTheme,
  useMediaQuery,
} from "@mui/material";

export const TableFooter: React.FC<IChangePageAndPerPage & ITableFooterProps> = ({ 
  handleChangePageCurrent, 
  handleChangePerPageCurrent,
  totalPageCont=1,
  pageCurrent,
  perPageCurrent
}) => {
  const theme = useTheme();

  const lgDown = useMediaQuery(theme.breakpoints.down("lg"));
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  return(
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
        value={perPageCurrent}
        onChange={(event: any) => handleChangePerPageCurrent({ perPageCurrent: +event.target.value })}
        autoWidth
        variant="standard"
        size="small"
        sx={{ mx: 2 }}
      >
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={90}>90</MenuItem>
      </Select>
      <Pagination 
        color="primary" 
        size="small" 
        page={pageCurrent}
        count={totalPageCont} 
        onChange={(_, page) => handleChangePageCurrent({ pageCurrent: page})} 
      />
    </Box>
  );
};
