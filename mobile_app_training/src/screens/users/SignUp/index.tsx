import { Box, Heading, VStack, FormControl, Input, Button, ScrollView, useTheme, Text } from "native-base";

import { Layout } from "@src/components/Layout";

export const SignUp = () => {
  const { colors } = useTheme();
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
                h={50}
                fontSize="md"
                rounded={10}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input 
                placeholder="Informe o Email"
                h={50}
                fontSize="md"
                rounded={10}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Senha</FormControl.Label>
              <Input 
                type="password" 
                placeholder="Informe a Senha" 
                h={50}
                fontSize="md"
                rounded={10}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Retipa Senha</FormControl.Label>
              <Input 
                type="password" 
                variant="outline"
                placeholder="Confirme a Senha"
                h={50}
                fontSize="md"
                rounded={10}
                cursorColor={colors.primaryApp.dark}
                _focus={{
                  bgColor: "teal.50",
                  borderColor: colors.primaryApp.light,
                  borderWidth: 2,
                }}
              />
            </FormControl>
            <Button 
              mt="2" 
              size="lg" 
              rounded={25} 
              bgColor={colors.primaryApp.main} 
              onPress={() => console.log("aquiiii")} 
            >
              <Text fontSize="lg" fontWeight="semibold" color="white">CADASTRAR</Text>
            </Button>
          </VStack>
        </Box>
      </ScrollView>
    </Layout>
  );
};
