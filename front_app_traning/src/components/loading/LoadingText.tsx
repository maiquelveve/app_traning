import { CircularProgress, Typography } from "@mui/material";

export const LoadingText: React.FC<ILoadingText> = ({ size = 40, text = "Aguarde! Carregando...", color = "primary" }) => {
  return(
    <>
      <CircularProgress size={size} color={color} />
      <Typography>
        {text}
      </Typography>
    </>
  );
};
