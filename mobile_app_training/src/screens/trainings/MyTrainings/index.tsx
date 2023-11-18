import { Box, Button, Text } from "native-base";
import { useNavigation, NavigationProp } from "@react-navigation/native";

type RootStackParamList = {
  profile: undefined;
  // Adicione outras rotas conforme necessário
};

type TRoutes = NavigationProp<RootStackParamList>

export const MyTrainings = () => {
  const navigation = useNavigation<TRoutes>();

  return (
    <Box display="flex" flex={1} alignItems="center" justifyContent="center">
      <Text>MY TRAININGS</Text>
      <Button onPress={() => navigation.navigate("profile") }>PERFIL</Button>
    </Box>
  );
};
