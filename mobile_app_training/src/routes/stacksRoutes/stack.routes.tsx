import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
        name="home_auth"
        component={TabRoutes}
      />
    </Stack.Navigator>
  );
};
