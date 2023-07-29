import { Avatar, Box, Divider, useTheme } from "@mui/material";

export const HeaderContainerDrawerSidebar: React.FC = () => {
  const theme = useTheme();

  return(
    <>
      <Box width='100%' height={theme.spacing(20)} display='flex' alignItems='center' justifyContent='center' >
        <Avatar 
          sx={{ height: theme.spacing(12), width: theme.spacing(12) }} 
          src={""} 
        />
      </Box>
      <Divider />
    </>
  );
};
