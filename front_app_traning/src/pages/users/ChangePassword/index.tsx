import { Box, CardHeader } from "@mui/material";
import { CardComponent, Page } from "../../../components";
import { FormChangePassword } from "./components";

export const ChangePassword: React.FC = () => {
  return(
    <Page title="Trocar Senha">
      <Box 
        flex={1} 
        minHeight="70vh"
        display="flex" 
        flexDirection="column" 
        alignItems="center"
        justifyContent="center"
      >
        <CardComponent>
          <CardHeader
            subheader="Autualize sua senha"
            title="Nova Senha"
          />
          <FormChangePassword />
        </CardComponent>
      </Box>
    </Page>
  );
};
