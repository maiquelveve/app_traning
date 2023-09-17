import { DialogContent } from "@mui/material";

export const ContainerModalDefault: React.FC<IAppProps> = ({ children }) => {
  return(
    <DialogContent dividers>
      {children}
    </DialogContent>
  );
};
