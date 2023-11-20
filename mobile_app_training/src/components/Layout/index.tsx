import { Box, VStack, useTheme } from "native-base";

import { Header } from "@src/components/Header";

export const Layout: React.FC<ILayoutProps> = ({ children, pagePosition="center", headerType="STACK", title="" }) => {
  const { colors } = useTheme();

  return (
    <VStack flex={1}>
      <Header headerType={headerType} title={title} />
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
