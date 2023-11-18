import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, Entypo } from "@expo/vector-icons";
import { Box, Text } from "native-base";

import Feed from "../screens/Feed";
import New from "../screens/New";
import Profile from "../screens/Profile";

const Tab = createBottomTabNavigator();

const menus: ITabBarMenu[] = [
  { route: "feed", label: "INICIO", Icon: (props: any) => <Entypo name="home" {...props} />, component: Feed },
  { route: "search", label: "PROCURAR", Icon: (props: any) => <Feather name="search" {...props} />, component: New },
  { route: "new", label: "NOVO", Icon: (props: any) => <Entypo name="plus" {...props} />, component: Feed },
  { route: "notification", label: "NOTIFICAÇÕES", Icon: (props: any) => <Entypo name="notification" {...props} />, component: New },
  { route: "profile", label: "PERFIL", Icon: (props: any) => <Feather name="user" {...props} />, component: Profile },
];

export default function TabRoutes() {
  return(
    <Tab.Navigator 
      screenOptions={{ 
        tabBarShowLabel: false,
        headerShown: false, 
        tabBarStyle: {
          backgroundColor: "#121212",
          borderColor: "#000",
          borderWidth: 0,
          height: 65,
          padding: 5,
          paddingBottom: 5,
          paddingTop: 5,
          paddingHorizontal: 5,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5
        },
        tabBarActiveTintColor: "#FFF",
      }}
    >
      {menus.map((item, index) => (
        <Tab.Screen
          key={index}
          name={`${item.route}_tab`}
          component={item.component}
          options={{
            tabBarIcon: ({ size, color, focused }) => {
              const { Icon, label } = item;
              return(
                <Box>
                  {focused ?
                    <Box 
                      display="flex" 
                      alignItems="center" 
                      justifyContent="center"
                      width={60} 
                      height={60} 
                      borderRadius={15} 
                      backgroundColor={"#0abf04"} 
                      marginBottom={45}
                    >
                      <Icon color={color} size={size } />
                      <Text isTruncated maxW="300" fontSize="xs" color={"#FFF"}>{label}</Text>
                    </Box>
                    :
                    <Box display="flex" alignItems="center" justifyContent="center">
                      <Icon color={color} size={size } />
                      <Text isTruncated maxW="300" w="100%" fontSize="xs" color={"#FFF"}>{label}</Text>
                    </Box>
                  }
                </Box>
              );
            },
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
