import { VStack, HStack, Text, Alert, Box, IconButton, CloseIcon } from "native-base";

export const alertResponseSystem = ({ id, toast, settings }: IAlertResponseSystemProps) => {

  const { isSuccess, title, message, variant, duration, placement } = settings;

  toast.show({
    id,
    duration,
    placement,
    render: (() => (
      <Alert 
        mx={2} 
        my={2} 
        mt={4} 
        alignSelf="center" 
        flexDirection="row" 
        status={isSuccess ? "success" : "error"} 
        variant={variant}
      >
        <VStack space={1} flexShrink={1} w="100%">
          <HStack flexShrink={1} alignItems="center" justifyContent="space-between">
            <HStack space={2} flexShrink={1} alignItems="center">
              <Alert.Icon />
              <Text fontSize="md" fontWeight="medium" color="coolGray.800" flexShrink={1} >
                {title}
              </Text>
            </HStack>
            <IconButton 
              variant="unstyled" 
              icon={<CloseIcon size="3" />} 
              _icon={{ color: "darkText" }} 
              onPress={() => toast.close(id)} 
            />
          </HStack>
          <Box>
            {message.map((msg, index) => (
              <Text fontSize="sm" color="coolGray.800" pl={6} key={index}>
                {msg}
              </Text>
            ))}
          </Box>
        </VStack>
      </Alert>
    ))
  });
};
