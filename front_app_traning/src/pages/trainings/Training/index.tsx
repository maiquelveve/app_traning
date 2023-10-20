import { Box, Button, CardContent, Typography } from "@mui/material";

export const Training: React.FC<ITrainingCalssProps> = ({ handleGoBack }) => {
  return(
    <CardContent>
      <Button variant="text" onClick={handleGoBack}>{"<-"}</Button>
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
        <Typography>TRAINING</Typography>
      </Box>
    </CardContent>
  );
};
