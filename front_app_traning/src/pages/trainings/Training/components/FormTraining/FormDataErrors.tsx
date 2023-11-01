import { Typography } from "@mui/material";

export const FormDataErrors: React.FC<IFormDataErrorsProps> = ({ errors }) => {
  console.log(errors);
  return(
    <Typography>FORM ERROR</Typography>
  );
};
