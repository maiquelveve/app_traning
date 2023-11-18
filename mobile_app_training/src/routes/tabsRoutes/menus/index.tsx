import { Entypo, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

import { SignIn } from "@screens/users/SignIn";
import { SignUp } from "@screens/users/SignUp";

import { Home } from "@screens/dashboard/Home";
import { Profile } from "@screens/users/Profile";
import { MyTrainings } from "@screens/trainings/MyTrainings";

const menusTabDefault: ITabBarMenu[] = [
  { route: "home", label: "INICIO", Icon: (props: any) => <Entypo name="home" {...props} />, component: Home },
  { route: "my_trainings", label: "TREINO", Icon: (props: any) => <MaterialIcons name="fitness-center" {...props} />, component: MyTrainings },
  { route: "profile", label: "PERFIL", Icon: (props: any) => <FontAwesome5 name="user-cog" {...props} />, component: Profile },
];

const menusTabIsNotAuth: ITabBarMenu[] = [
  { route: "signIn", label: "ENTRAR", Icon: (props: any) => <Entypo name="lock-open" {...props} />, component: SignIn },
  { route: "signUp", label: "CRIAR", Icon: (props: any) => <FontAwesome5 name="user-edit" {...props} />, component: SignUp },
];

export const getTabMenus = () => {
  const userAuth = false;
  return userAuth ? menusTabDefault : menusTabIsNotAuth;
};
