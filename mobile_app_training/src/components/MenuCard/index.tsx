import { Pressable, Text, Box, HStack, Badge, Spacer } from "native-base";

export const MenuCard: React.FC<IMenusGeneratorProps> = (menuData) => {
  const { Icon, handleNavigate, description, tag, title } = menuData;

  return(
    <Box width="full" my={2} >
      <Pressable onPress={handleNavigate}>
        {({ isPressed }) => {
          return (
            <Box 
              borderWidth="2" 
              borderColor="coolGray.300" 
              shadow="9" 
              bg={isPressed ? "coolGray.200" : "gray.50"} 
              p="5" 
              rounded="8" 
              style={{ transform: [{ scale: isPressed ? 0.96 : 1 }] }}
            >
              <HStack alignItems="center" justifyContent="center">
                <Badge colorScheme="green" _text={{ color: "white" }} variant="solid" rounded="4">
                  {tag.toUpperCase()}
                </Badge>
                <Spacer />
                {<Icon />}
              </HStack>
              <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl">
                {title}
              </Text>
              <Text mt="2" fontSize="sm" color="coolGray.700">
                {description}
              </Text>
            </Box>
          );
        }}
      </Pressable>
    </Box>
  );
};
