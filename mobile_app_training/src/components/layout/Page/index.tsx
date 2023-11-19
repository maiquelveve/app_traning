import { Box, VStack, Heading, HStack, useTheme, Divider } from "native-base";
import { Entypo } from "@expo/vector-icons";

export const Page: React.FC<IPageProps> = ({ children, pagePosition="center" }) => {
  const { colors } = useTheme();

  return (
    <VStack flex={1}>
      <Divider bgColor={colors.primaryApp.dark} />
      <HStack h={55} background={colors.primaryApp.main} shadow={9} >
        <Box display="flex" alignItems="flex-start" justifyContent="center" p={2}>
          <Entypo name="arrow-left" size={25} onPress={() => console.log("aquiu")} />
        </Box>
        <Box display="flex" alignItems="flex-start" justifyContent="center" p={2}>
          <Heading color="white" >HEADER</Heading>
        </Box>
      </HStack>
      <Divider bgColor={colors.primaryApp.dark} />
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
