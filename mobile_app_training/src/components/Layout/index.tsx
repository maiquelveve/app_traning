import { Box, VStack, useTheme } from "native-base";

import { Header } from "@src/components/Header";

export const Layout: React.FC<IPageProps> = ({ children, pagePosition="center" }) => {
  const { colors } = useTheme();

  return (
    <VStack flex={1}>
      <Header />
      <Box 
        flex={1} 
        background={"white"}
        p={3}
      >
        <VStack 
          background={colors.backgroundApp.paper} 
          justifyContent={pagePosition} 
          display="flex" 
          h="full" 
          rounded={15} 
          shadow={9} 
          p={3} 
        >
          <Box w="full" alignItems="center">
            {children}
          </Box>
        </VStack>
      </Box>
    </VStack>
  );
};
