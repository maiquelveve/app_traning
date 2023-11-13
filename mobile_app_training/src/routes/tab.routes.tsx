import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import Feed from "../screens/Feed";
import New from "../screens/New";

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return(
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="feed"
        component={Feed}
        options={{
          tabBarIcon: ({ size, color }) => <Feather name="home" color={color} size={size }/>,
          tabBarLabel: "Início"
        }}
      />
      <Tab.Screen
        name="new"
        component={New}
        options={{
          tabBarIcon: ({ size, color }) => <Feather name="plus" color={color} size={size }/>,
          tabBarLabel: "Novo"
        }}
      />
    </Tab.Navigator>
  );
}
