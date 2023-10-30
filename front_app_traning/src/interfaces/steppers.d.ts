interface IColorStepperIconRoot {
  completed?: boolean; 
  active?: boolean;
}

interface IButtonSteppersProps {
  handleBack: () => void;
  handleNext: () => void;
  activeStep: number;
}
