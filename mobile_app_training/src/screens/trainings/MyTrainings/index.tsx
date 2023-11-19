import { Box, Button, Text } from "native-base";
import { useNavigation, NavigationProp } from "@react-navigation/native";

import { Layout } from "@src/components/Layout";

type RootStackParamList = {
  profile: undefined;
  // Adicione outras rotas conforme necessário
};

type TRoutes = NavigationProp<RootStackParamList>

export const MyTrainings = () => {
  const navigation = useNavigation<TRoutes>();

  return (
    <Layout>
      <Box>
        <Text>MY TRAININGS</Text>
        <Button onPress={() => navigation.navigate("profile") }>PERFIL</Button>
      </Box>
    </Layout>
  );
};
