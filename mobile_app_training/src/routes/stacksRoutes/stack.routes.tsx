import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Profile } from "@screens/users/Profile";
import { TabRoutes } from "@routes/tabsRoutes/tab.routes";

const Stack = createNativeStackNavigator();

export const StackRoutes = () => {
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
};
