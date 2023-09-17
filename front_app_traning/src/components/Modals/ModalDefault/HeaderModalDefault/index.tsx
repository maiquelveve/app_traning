import { DialogTitle, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

export const HeaderModalDefault: React.FC<IHeaderModalDefaultProps> = ({ title, handleClose }) => {
  return(
    <>
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {title}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <Close />
      </IconButton>
    </>
  );
};
