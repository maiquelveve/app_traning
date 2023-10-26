import { Dialog } from "@mui/material";

export const RootModalDefault: React.FC<IRootModalDefaultProps> = ({ children, handleClose, open, maxWidth="sm" }) => {
  return(
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth
      maxWidth={maxWidth}
    >
      {children}
    </Dialog>
  );
};
