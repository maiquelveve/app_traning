import { createContext, useContext } from "react";
import { useToast } from "native-base";
import uuid from "react-native-uuid";

import { alertCatchSystem, alertResponseSystem } from "./alertsSystem";

const AlertContext = createContext({} as IAlertContext);

export const useAlertContext = () => {
  return useContext(AlertContext);
};

export const AlertProvider: React.FC<IAppProps> = ({ children }) => {
  const toast = useToast();

  const alertResponse = ({ duration=5000, placement="top", variant="left-accent", ...rest }: ISettingAlertResponseSystemProps) => {
    alertResponseSystem({ id: `alert_response_${uuid.v4()}`, toast: toast, settings: { duration, placement, variant, ...rest }  });
  };

  const alertCatch = () => {
    alertCatchSystem({ id: `alert_catch_${uuid.v4()}`, toast: toast });
  };

  return(
    <AlertContext.Provider value={{
      alertCatch,
      alertResponse,
    }}>
      {children}
    </AlertContext.Provider>
  );
};

