import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, Entypo } from "@expo/vector-icons";
import { Box } from "native-base";

import Feed from "../screens/Feed";
import New from "../screens/New";
import Profile from "../screens/Profile";

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return(
    <Tab.Navigator 
      screenOptions={{ 
        tabBarShowLabel: false,
        headerShown: false, 
        tabBarStyle: {
          backgroundColor: "#121212",
          borderTopColor: "transparent",
          height: 65,
          paddingBottom: 5,
          paddingTop: 5,
          paddingHorizontal: 5,
          marginLeft: 3,
          marginRight: 3,
          marginBottom: 3,
          borderRadius: 20,
        },
        tabBarActiveTintColor: "#FFF",
        tabBarItemStyle: {
          paddingBottom: 5,
          paddingTop: 5,
        }
      }}
    >
      <Tab.Screen
        name="feed"
        component={Feed}
        options={{
          tabBarIcon: ({ size, color, focused }) => {
            return(
              <>
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
                    <Entypo name="home" color={color} size={size }/>
                  </Box>
                  :
                  <Box display="flex" alignItems="center" justifyContent="center">
                    <Entypo name="home" color={color} size={size }/>
                  </Box>
                }
              </>
            );
          },
        }}
      />
      <Tab.Screen
        name="new"
        component={New}
        options={{
          tabBarIcon: ({ size, color, focused }) => {
            return(
              <>
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
                    <Feather name="search" color={color} size={size }/>
                  </Box>
                  :
                  <Box display="flex" alignItems="center" justifyContent="center">
                    <Feather name="search" color={color} size={size }/>
                  </Box>
                }
              </>
            );
          },
        }}
      />
      <Tab.Screen
        name="new2"
        component={New}
        options={{
          tabBarIcon: ({ size, color, focused }) => {
            return(
              <>
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
                    <Entypo name="plus" color={color} size={size}/>
                  </Box>
                  :
                  <Box 
                    display="flex" 
                    alignItems="center" 
                    justifyContent="center"
                  >
                    <Entypo name="plus" color={color} size={size}/>
                  </Box>
                }
              </>
            );
          },
        }}
      />
      <Tab.Screen
        name="new3"
        component={New}
        options={{
          tabBarIcon: ({ size, color, focused }) => {
            return(
              <>
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
                    <Entypo name="notification" color={color} size={size }/>
                  </Box>
                  :
                  <Box display="flex" alignItems="center" justifyContent="center">
                    <Entypo name="notification" color={color} size={size }/>
                  </Box>
                }
              </>
            );
          },
        }}
      />
      <Tab.Screen
        name="profile_tab"
        component={Profile}
        options={{
          tabBarIcon: ({ size, color, focused }) => {
            return(
              <>
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
                    <Feather name="user" color={color} size={size }/>
                  </Box>
                  :
                  <Box display="flex" alignItems="center" justifyContent="center">
                    <Feather name="user" color={color} size={size }/>
                  </Box>
                }
              </>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
