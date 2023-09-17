import { Dialog } from "@mui/material";

export const RootModalDefault: React.FC<IRootModalDefaultProps> = ({ children, handleClose, open }) => {
  return(
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth
    >
      {children}
    </Dialog>
  );
};
