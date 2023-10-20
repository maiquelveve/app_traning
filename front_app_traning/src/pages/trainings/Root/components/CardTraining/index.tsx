import { CardContent, Typography, Card, CardHeader, CardMedia, useTheme } from "@mui/material";

export const CardTraining: React.FC<ICardTrainingProps> = ({ desc, img, title, subTitle, handleClick }) => {
  const theme = useTheme();

  return(
    <Card 
      sx={{ 
        maxWidth: 345, 
        width: 345, 
        borderRadius: 8, 
        cursor: "pointer",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "scale(1.15)",
          background: theme.palette.grey[200],
        },
      }} 
      elevation={15} 
      onClick={handleClick} 
    >
      <CardHeader
        titleTypographyProps={{ textAlign: "center" }}
        subheaderTypographyProps={{ textAlign: "center" }}
        title={title.toUpperCase()}
        subheader={subTitle}
      />
      <CardMedia
        component="img"
        height="250"
        image={img}
        alt="training"
      />
      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">{ desc }</Typography>
      </CardContent>
    </Card>
  );
};
