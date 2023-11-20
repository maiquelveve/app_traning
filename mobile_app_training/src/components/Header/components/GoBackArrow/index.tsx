import { Box } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const GoBackArrow: React.FC = () => {
  return(
    <Box display="flex" alignItems="flex-start" justifyContent="center" p={2}>
      <MaterialCommunityIcons name="keyboard-backspace" size={24} color={"white"} />
    </Box>
  );
};
