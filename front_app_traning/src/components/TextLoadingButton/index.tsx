import { CircularProgress, useTheme } from "@mui/material";

export const TextLoadingButton = ({ isLoading, text, color, size = 26 }: ITextLoadingButton) => {
  const theme = useTheme();

  return isLoading ? <CircularProgress sx={{ color: color ? color : theme.palette.primary.dark }} size={size} /> : text; 
};
