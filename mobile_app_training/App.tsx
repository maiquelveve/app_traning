import "react-native-gesture-handler";
import { NativeBaseProvider, StatusBar } from "native-base";

import { Routes } from "@routes/index";

export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar backgroundColor="#121212"  barStyle={"light-content"} />
      <Routes />
    </NativeBaseProvider>
  );
}
