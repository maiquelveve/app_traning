import { Box, Button, Text } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { Layout } from "@src/components/Layout";

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
