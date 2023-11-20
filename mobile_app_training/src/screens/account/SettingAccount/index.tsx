import { Box, Button, Text } from "native-base";
import { useNavigation, NavigationProp } from "@react-navigation/native";

import { Layout } from "@src/components/Layout";

type RootStackParamList = {
  profile: undefined;
  // Adicione outras rotas conforme necessário
};

type TRoutes = NavigationProp<RootStackParamList>

export const SettingAccount = () => {
  const navigation = useNavigation<TRoutes>();

  return (
    <Layout headerType={"TAB"}>
      <Box>
        <Text>SETTING ACCOUNT</Text>
        <Button onPress={() => navigation.navigate("profile") }>MEU PERFIL</Button>
      </Box>
    </Layout>
  );
};
