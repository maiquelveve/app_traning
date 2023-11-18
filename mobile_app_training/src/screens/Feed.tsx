import { Box, Button, Text } from "native-base";
import { useNavigation, NavigationProp } from "@react-navigation/native";

type RootStackParamList = {
  new: undefined;
  profile: undefined;
  profile_tabbar: undefined;
  feed: undefined;
  // Adicione outras rotas conforme necessário
};

type TRoutes = NavigationProp<RootStackParamList>

export default function Feed() {
  const navigation = useNavigation<TRoutes>();

  return (
    <Box display="flex" flex={1} alignItems="center" justifyContent="center">
      <Text>FEED</Text>
      <Button onPress={() => navigation.navigate("profile") }>PERFIL</Button>
      <Button onPress={() => navigation.navigate("profile_tabbar") }>PERFIL TAB</Button>
    </Box>
  );
}
