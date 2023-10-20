import { Box, Button, CardContent, Typography } from "@mui/material";

export const Class: React.FC<ITrainingCalssProps> = ({ handleGoBack }) => {
  return(
    <CardContent>
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
        <Button variant="outlined" onClick={handleGoBack}>VOLTAR</Button>
        <Typography>CLASSES</Typography>
      </Box>
    </CardContent>
  );
};
