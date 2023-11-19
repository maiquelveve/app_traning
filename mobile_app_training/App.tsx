import "react-native-gesture-handler";
import { NativeBaseProvider, StatusBar } from "native-base";

import { themeSystem } from "@src/theme";
import { Routes } from "@routes/index";

export default function App() {
  return (
    <NativeBaseProvider theme={themeSystem}>
      <StatusBar backgroundColor={themeSystem.colors.backgroundApp.dark}  barStyle={"light-content"} />
      <Routes />
    </NativeBaseProvider>
  );
}
