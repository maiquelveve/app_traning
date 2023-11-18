import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Box, Text } from "native-base";

import { getTabMenus } from "./menus";

const Tab = createBottomTabNavigator();

export const TabRoutes = () => {
  const menus = getTabMenus();

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
        tabBarItemStyle: {
          padding:2
        }
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
                      {label.trim() !== "" && 
                        <Text isTruncated maxW="300" mt={2} fontSize="xs" color={"#FFF"}>{label}</Text>
                      }
                    </Box>
                    :
                    <Box display="flex" alignItems="center" justifyContent="center">
                      <Icon color={color} size={size } />
                      {label.trim() !== "" && 
                        <Text isTruncated maxW="300" w="100%" mt={2} fontSize="xs" color={"#FFF"}>{label}</Text>
                      }
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
};
