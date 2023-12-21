import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TabRoutes } from "@src/routes/tabsRoutes/tab.routes";

import { useAuthUserContext } from "@src/context/AuthUserContext";
import { menusTabDefault, menusTabIsNotAuth } from "@src/routes/tabsRoutes/menus";

const Stack = createNativeStackNavigator();

export const StackRoutes = () => {

  const { getToken } = useAuthUserContext();

  return (
    <Stack.Navigator initialRouteName={getToken() ? "init_auth" : "init"} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="init">
        {(props: any) => <TabRoutes {...props} menus={menusTabIsNotAuth} />}
      </Stack.Screen>
      <Stack.Screen name="init_auth">
        {(props: any) => <TabRoutes {...props} menus={menusTabDefault} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
