import "react-native-gesture-handler";
import { NativeBaseProvider, StatusBar } from "native-base";

import { themeSystem } from "@src/theme";
import { Routes } from "@src/routes/index";
import { AuthUserProvider } from "@src/context/AuthUserContext";

export default function App() {
  return (
    <NativeBaseProvider theme={themeSystem}>
      <AuthUserProvider>
        <StatusBar backgroundColor={themeSystem.colors.backgroundApp.dark}  barStyle={"light-content"} />
        <Routes />
      </AuthUserProvider>
    </NativeBaseProvider>
  );
}
