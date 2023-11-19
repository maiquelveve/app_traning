import { Box, Button, Text } from "native-base";
import { useNavigation, NavigationProp } from "@react-navigation/native";

import { Page } from "@src/components/layout";

type RootStackParamList = {
  profile: undefined;
  // Adicione outras rotas conforme necessário
};

type TRoutes = NavigationProp<RootStackParamList>

export const MyTrainings = () => {
  const navigation = useNavigation<TRoutes>();

  return (
    <Page>
      <Box>
        <Text>MY TRAININGS</Text>
        <Button onPress={() => navigation.navigate("profile") }>PERFIL</Button>
      </Box>
    </Page>
  );
};
