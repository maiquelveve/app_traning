import { useState } from "react";
import { Avatar, Box, Button, HStack, ScrollView, Text, VStack, useTheme } from "native-base";
import { SimpleLineIcons } from "@expo/vector-icons";

import { Layout } from "@src/components/Layout";
import { useAuthUserContext } from "@src/context/AuthUserContext";
import { AcessMenusGenerator } from "@src/components/AcessMenusGenerator";

import { accountMenus } from "@src/screens/account/menus";
import { API_BASE_URL } from "@src/config/constants";

export const SettingAccount = () => {
  const [loading, setLoading] = useState(false);

  const { logout, getUserAuth } = useAuthUserContext();
  const { colors } = useTheme();

  const { avatar_filename, name } = getUserAuth()!;

  const handleLogout = () => {
    setLoading(true);
    logout();    
    setLoading(false);
  };

  return (
    <Layout headerType={"TAB"} pagePosition="flex-start">
      <VStack display="flex" width="full" height="full" justifyContent="space-between">
        <VStack my={2} alignItems="center" justifyContent="center" space={1}>
          <Avatar 
            bg="green.500" 
            alignSelf="center" 
            size="lg" 
            source={{
              uri: avatar_filename ? `${API_BASE_URL}/files/${avatar_filename}` : ""
            }} 
          >
            ML
          </Avatar>
          <Text 
            fontSize="lg" 
            letterSpacing="lg" 
            fontWeight="semibold" 
            textTransform="uppercase" 
            noOfLines={1}
          >
            {name}
          </Text>
          <Text 
            fontSize="xs" 
            textTransform="uppercase" 
            color="blueGray.400"
            italic
          >
            ADMINISTRADOR
          </Text>
        </VStack>
        <ScrollView showsVerticalScrollIndicator={false}>
          <AcessMenusGenerator menus={accountMenus} />
        </ScrollView>
        <Box mt={4} mb={1}>
          <Button 
            onPress={handleLogout} 
            isLoading={loading} 
            rounded={15} 
            borderWidth={2}
            variant="outline" 
            borderColor="red.700" 
            _pressed={{
              bgColor: "blueGray.100",
            }}
          >
            <HStack display="flex" alignItems="center" space={2}>  
              <SimpleLineIcons name="logout" size={20} color={colors.red[700]} />
              <Text color="red.700" fontSize="lg" fontWeight="extrabold">
                SAIR
              </Text>
            </HStack>
          </Button>
        </Box>
      </VStack>
    </Layout>
  );
};
