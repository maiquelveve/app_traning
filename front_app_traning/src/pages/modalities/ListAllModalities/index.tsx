import { Box, CardContent } from "@mui/material";
import { CardComponent, Page } from "../../../components";
import { TableModalities } from "./components";

export const ListAllModalities: React.FC = () => {

  return(
    <Page title="Modalidades">
      <CardComponent>
        <CardContent>
          <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
            <TableModalities />
          </Box>
        </CardContent>
      </CardComponent>
    </Page>
  );
};
