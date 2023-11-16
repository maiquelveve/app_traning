import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Profile from "../screens/Profile";
import TabRoutes from "./tab.routes";

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="init"
        component={TabRoutes}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="profile"
        component={Profile}
      />
    </Stack.Navigator>
  );
}
