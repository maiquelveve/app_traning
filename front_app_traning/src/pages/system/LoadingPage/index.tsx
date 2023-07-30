import { Box, Stack } from "@mui/material";

import { LoadingText, Logo } from "../../../components";

export const LoadingPage: React.FC = () => {
  return(
    <Box flex={1} flexDirection="column" display="flex" alignItems={"center"} mt={10}>
      <Box >
        <Logo type="removebgmain2" width={"auto"}  height={"auto"} />
      </Box>
      <Stack spacing={2} display="flex" my={18}  flex={1} alignItems="center" >
        <LoadingText size={60} />
      </Stack>
    </Box>
  );
};
