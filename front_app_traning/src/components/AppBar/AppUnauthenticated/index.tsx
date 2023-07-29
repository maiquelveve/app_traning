import { Typography } from "@mui/material";

import { AppBarDefault } from "../AppBarDefault";

export const AppUnauthenticated: React.FC = () => {
  return (
    <AppBarDefault>
      <Typography variant="h6" noWrap component="div">
        FAZER LOGIN
      </Typography>
    </AppBarDefault>
  );
};
