import { IconButton } from "@mui/material";
import { LockOpen } from "@mui/icons-material";

import { AppBarDefault } from "../AppBarDefault";

export const AppUnauthenticated: React.FC = () => {
  return (
    <AppBarDefault>
      <IconButton aria-label="delete" size="small">
        <LockOpen fontSize="medium" />
      </IconButton>
    </AppBarDefault>
  );
};
