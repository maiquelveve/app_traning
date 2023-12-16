import "react-native-gesture-handler";
import { NativeBaseProvider, StatusBar } from "native-base";
import { NavigationContainer } from "@react-navigation/native";

import { themeSystem } from "@src/theme";
import { Routes } from "@src/routes/index";
import { AuthUserProvider } from "@src/context/AuthUserContext";
import { AlertProvider } from "@src/context/AlertContext";

export default function App() {
  return (
    <NativeBaseProvider theme={themeSystem}>
      <NavigationContainer>
        <AlertProvider>
          <AuthUserProvider>
            <StatusBar backgroundColor={themeSystem.colors.backgroundApp.dark}  barStyle={"light-content"} />
            <Routes />
          </AuthUserProvider>
        </AlertProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
