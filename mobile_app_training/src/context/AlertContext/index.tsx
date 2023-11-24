import { createContext, useContext } from "react";
import { useToast, VStack, HStack, Text, Alert, Box } from "native-base";
// import { IToastProps } from "native-base";
interface IAlertContext {
  alertCatch: () => void;
}

// interface IAlertProps {
//   id: any;
//   toast: TToast;
// }

// type TToast = {
//   show: (props: IToastProps) => any;
//   close: (id: any) => void;
//   closeAll: () => void;
//   isActive: (id: any) => boolean;
// }

const AlertContext = createContext({} as IAlertContext);

export const useAlertContext = () => {
  return useContext(AlertContext);
};

export const AlertProvider: React.FC<IAppProps> = ({ children }) => {
  const toast = useToast();

  const alertCatch = () => {
    toast.show({
      id: "alert_catch",
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

  return(
    <AlertContext.Provider value={{
      alertCatch,
    }}>
      {children}
    </AlertContext.Provider>
  );
};

