import { 
  Pagination, 
  Typography, 
  Box,
  MenuItem,
  Select,
  useTheme,
  useMediaQuery,
} from "@mui/material";

export const TableFooter: React.FC = () => {
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
  );
};
