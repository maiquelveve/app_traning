import { StepConnector } from "@mui/material";
import { stepConnectorClasses } from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";

export const ColorStepperConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg, rgb(10,191,4) 0%, rgb(27,94,32) 50%, rgb(7,141,3) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg, rgb(10,191,4) 0%, rgb(27,94,32) 50%, rgb(7,141,3) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));
