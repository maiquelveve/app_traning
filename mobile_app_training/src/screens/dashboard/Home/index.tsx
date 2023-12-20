import { Layout } from "@src/components/Layout";

import { useAuthUserContext } from "@src/context/AuthUserContext";
import { AcessMenusGenerator } from "@src/components/AcessMenusGenerator";

import { rootMenus, trainerMenus, userMenus } from "../menus";
import { Box, Heading, ScrollView, Text, VStack } from "native-base";

export const Home = () => {
  const { getProfilesUserAuth } = useAuthUserContext();

  const { isRootProfiles, isTrainerProfiles } = getProfilesUserAuth();
  const menus = isRootProfiles ? rootMenus : isTrainerProfiles ? trainerMenus : userMenus;

  return (
    <Layout headerType={"TAB"} pagePosition="flex-start" >
      <VStack space={2}>
        <Box alignItems="center" my={3}>
          <Heading letterSpacing={2}>Bem-Vindo</Heading>
          <Text letterSpacing={1} fontSize="sm" italic color="blueGray.500">Escolha uma opção de acesso!</Text>
        </Box>
        <ScrollView showsVerticalScrollIndicator={false} display="flex" width="full" height="full" >
          <AcessMenusGenerator menus={menus} />
        </ScrollView>
      </VStack>
    </Layout>
  );
};
