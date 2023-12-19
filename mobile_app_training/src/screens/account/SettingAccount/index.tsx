import { useState } from "react";
import { Box, Button, HStack, Text, VStack, useTheme } from "native-base";
import { SimpleLineIcons } from "@expo/vector-icons";

import { Layout } from "@src/components/Layout";
import { useAuthUserContext } from "@src/context/AuthUserContext";

export const SettingAccount = () => {
  const [loading, setLoading] = useState(false);

  const { logout } = useAuthUserContext();
  const { colors } = useTheme();

  const handleLogout = () => {
    setLoading(true);
    logout();    
    setLoading(false);
  };

  return (
    <Layout headerType={"TAB"} pagePosition="flex-start">
      <VStack display="flex" width="full" height="full" justifyContent="space-between">
        <Box >
          <Button onPress={() => {}} isLoading={loading} >MENUS</Button>
        </Box>
        <Box>
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
