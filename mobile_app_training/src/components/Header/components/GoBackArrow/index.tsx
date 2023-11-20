import { Box } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const GoBackArrow: React.FC = () => {
  const navigation = useNavigation();
  return(
    <Box display="flex" alignItems="flex-start" justifyContent="center" p={2}>
      <MaterialCommunityIcons name="keyboard-backspace" size={24} color={"white"} onPress={() => navigation.goBack()} />
    </Box>
  );
};
