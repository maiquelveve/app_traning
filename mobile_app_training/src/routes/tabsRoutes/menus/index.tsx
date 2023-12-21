import { Entypo, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

import { SignIn } from "@src/screens/users/SignIn";
import { SignUp } from "@src/screens/users/SignUp";

import { Home } from "@src/screens/dashboard/Home";
import { SettingAccount } from "@src/screens/account/SettingAccount";
import { MyTrainings } from "@src/screens/trainings/MyTrainings";

export const menusTabDefault: ITabBarMenu[] = [
  { route: "home", label: "INICIO", Icon: (props: any) => <Entypo name="home" {...props} />, component: Home },
  { route: "my_trainings", label: "TREINO", Icon: (props: any) => <MaterialIcons name="fitness-center" {...props} />, component: MyTrainings },
  { route: "setting_account", label: "CONTA", Icon: (props: any) => <FontAwesome5 name="user-cog" {...props} />, component: SettingAccount },
];

export const menusTabIsNotAuth: ITabBarMenu[] = [
  { route: "signIn", label: "ENTRAR", Icon: (props: any) => <Entypo name="lock-open" {...props} />, component: SignIn },
  { route: "signUp", label: "CRIAR", Icon: (props: any) => <FontAwesome5 name="user-edit" {...props} />, component: SignUp },
];
