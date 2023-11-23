import { Box, Heading, VStack, ScrollView } from "native-base";

import { Layout } from "@src/components/Layout";
import { FormCreateUser } from "@src/screens/users/SignUp/components/FormCreateUser";

export const SignUp = () => {
  return (
    <Layout headerType={"TAB"}>
      <ScrollView w={"full"}>
        <Box>
          <Heading size="lg" color="coolGray.800" _dark={{ color: "warmGray.50" }} fontWeight="semibold" textAlign="center">
            CADASTRAR
          </Heading>
          <Heading mt="1" color="coolGray.600" _dark={{ color: "warmGray.200" }} fontWeight="medium" size="xs" textAlign="center">
            Crie um conta!
          </Heading>
          <VStack mt="5">            
            <FormCreateUser />
          </VStack>
        </Box>
      </ScrollView>
    </Layout>
  );
};
