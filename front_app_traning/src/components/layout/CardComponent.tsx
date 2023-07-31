import { Box, Card } from "@mui/material";

export const CardComponent: React.FC<IAppProps> = ({ children }) => {
  return(
    <Card elevation={24} sx={{ borderRadius: 4 }}>
      <Box p={2}>
        {children}
      </Box>
    </Card>
  );
};
