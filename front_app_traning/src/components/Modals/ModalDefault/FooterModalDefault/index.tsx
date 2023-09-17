import { DialogActions } from "@mui/material";

export const FooterModalDefault: React.FC<IAppProps> = ({ children }) => {
  return(
    <DialogActions>
      {children}
    </DialogActions>
  );
};
