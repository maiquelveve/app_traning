import { Box } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

export const SettingAuth: React.FC = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" mr={4}>
      <MaterialIcons name="app-settings-alt" size={24} color={"white"} />
    </Box>
  );
};
