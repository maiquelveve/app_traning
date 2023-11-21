import { Box, Heading, VStack, FormControl, Input, Button, ScrollView, Text } from "native-base";

import { Layout } from "@src/components/Layout";

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
          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Nome</FormControl.Label>
              <Input 
                placeholder="Informe o Nome"
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input 
                placeholder="Informe o Email"
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Senha</FormControl.Label>
              <Input 
                type="password" 
                placeholder="Informe a Senha" 
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Retipa Senha</FormControl.Label>
              <Input 
                type="password" 
                placeholder="Confirme a Senha"
              />
            </FormControl>
            <Button 
              mt="2" 
              size="lg" 
              onPress={() => console.log("aquiiii")} 
              variant="solid"
            >
              <Text fontSize="lg" fontWeight="semibold" color="white">CADASTRAR</Text>
            </Button>
          </VStack>
        </Box>
      </ScrollView>
    </Layout>
  );
};
