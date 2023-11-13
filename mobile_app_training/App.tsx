import "react-native-gesture-handler";
import { NativeBaseProvider } from "native-base";
import { StatusBar } from "expo-status-bar";

import Routes from "./src/routes";

export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar style="auto" />
      <Routes />
    </NativeBaseProvider>
  );
}
