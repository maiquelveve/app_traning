import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Profile } from "@src/screens/users/Profile";
import { TabRoutes } from "@src/routes/tabsRoutes/tab.routes";

const Stack = createNativeStackNavigator();

export const StackRoutes = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="init"
        component={TabRoutes}
      />
      <Stack.Screen 
        name="profile"
        component={Profile}
      />
    </Stack.Navigator>
  );
};
