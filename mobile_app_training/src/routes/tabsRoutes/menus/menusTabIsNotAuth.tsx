import { Entypo, FontAwesome5 } from "@expo/vector-icons";

import { SignIn } from "@src/screens/users/SignIn";
import { SignUp } from "@src/screens/users/SignUp";

export const menusTabIsNotAuth: ITabBarMenu[] = [
  { route: "signIn", label: "ENTRAR", Icon: (props: any) => <Entypo name="lock-open" {...props} />, component: SignIn },
  { route: "signUp", label: "CRIAR", Icon: (props: any) => <FontAwesome5 name="user-edit" {...props} />, component: SignUp },
];
