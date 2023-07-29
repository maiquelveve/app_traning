import { Typography } from "@mui/material";

import { AppBarDefault } from "../AppBarDefault";

export const AppAuthenticated: React.FC = () => {
  return (
    <AppBarDefault>
      <Typography variant="h6" noWrap component="div">
        USER LOGADO
      </Typography>
    </AppBarDefault>
  );
};
