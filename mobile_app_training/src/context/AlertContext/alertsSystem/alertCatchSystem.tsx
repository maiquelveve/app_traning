import { VStack, HStack, Text, Alert, Box } from "native-base";

export const alertCatchSystem = ({ id, toast }: IAlertProps) => {
  toast.show({
    id: {id},
    placement: "top",
    duration: 8000,
    render: (() => (
      <Alert maxW="500" status="warning" variant="top-accent" my={1}>
        <VStack space={1} flexShrink={1} w="100%" display="flex" alignItems="center" justifyContent="center" p={2}>
          <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
            <HStack flexShrink={1} space={2} alignItems="center">
              <Alert.Icon />
              <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                Tente novamente mais tarde!
              </Text>
            </HStack>
          </HStack>
          <Box>
            <Text fontSize="sm" color="coolGray.800">
              Ocorreu um erro no sistema.
            </Text>
          </Box>
        </VStack>
      </Alert>
    )) 
  });
};
