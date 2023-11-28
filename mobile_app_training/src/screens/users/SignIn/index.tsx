import { Box, Heading, VStack, ScrollView } from "native-base";

import { Layout } from "@src/components/Layout";
import { FormLoginUser } from "@src/screens/users/SignIn/components/FormLoginUser";


export const SignIn = () => {
  return (
    <Layout headerType={"TAB"}>
      <ScrollView w={"full"}>
        <Box>
          <Heading size="lg" color="coolGray.800" _dark={{ color: "warmGray.50" }} fontWeight="semibold" textAlign="center">
            Entrar
          </Heading>
          <Heading mt="1" color="coolGray.600" _dark={{ color: "warmGray.200" }} fontWeight="medium" size="xs" textAlign="center">
            Informe Email e Senha
          </Heading>
          <VStack mt="5">            
            <FormLoginUser />
          </VStack>
        </Box>
      </ScrollView>
    </Layout>
  );
};
