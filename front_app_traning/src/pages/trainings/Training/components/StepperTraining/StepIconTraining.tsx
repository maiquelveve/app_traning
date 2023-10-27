
import {
  AddTask,
  DisplaySettings,
  FitnessCenter
} from "@mui/icons-material/";

import { ColorStepperIconRoot } from "../../../../../components";

export const StepIconTraining = (props: { icon: number; active: boolean; completed: boolean; }) => {
  const { active, completed, icon } = props;

  return (
    <ColorStepperIconRoot ownerState={{ completed, active }} >
      {icon === 1 && 
        <FitnessCenter />
      }
      {icon === 2 && 
        <DisplaySettings />
      }
      {icon === 3 && 
        <AddTask />
      }
    </ColorStepperIconRoot>
  );
};

