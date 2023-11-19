import { NavigationContainer } from "@react-navigation/native";
import { StackRoutes } from "@src/routes/stacksRoutes/stack.routes";

export const Routes = () => {
  return(
    <NavigationContainer>
      <StackRoutes />
    </NavigationContainer>
  );
};
