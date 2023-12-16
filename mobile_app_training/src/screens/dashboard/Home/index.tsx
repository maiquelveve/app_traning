import { Box, Text, Button } from "native-base";

import { Layout } from "@src/components/Layout";
import { useAuthUserContext } from "@src/context/AuthUserContext";
import { useState } from "react";

export const Home = () => {
  const [loading, setLoading] = useState(false);
  const { logout } = useAuthUserContext();

  const handleLogout = () => {
    setLoading(true);
    logout();    
    setLoading(false);
  };

  return (
    <Layout headerType={"TAB"} >
      <Box>
        <Text>HOME</Text>
        <Button onPress={handleLogout} isLoading={loading} >SAIR</Button>
      </Box>
    </Layout>
  );
};
