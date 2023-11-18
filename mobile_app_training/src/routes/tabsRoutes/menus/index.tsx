import { Feather, Entypo } from "@expo/vector-icons";

import Feed from "@screens/Feed";
import New from "@screens/New";
import Profile from "@screens/Profile";

const menus: ITabBarMenu[] = [
  { route: "feed", label: "INICIO", Icon: (props: any) => <Entypo name="home" {...props} />, component: Feed },
  { route: "search", label: "PROCURAR", Icon: (props: any) => <Feather name="search" {...props} />, component: New },
  { route: "new", label: "NOVO", Icon: (props: any) => <Entypo name="plus" {...props} />, component: Feed },
  { route: "notification", label: "NOTIFICAÇÕES", Icon: (props: any) => <Entypo name="notification" {...props} />, component: New },
  { route: "profile", label: "PERFIL", Icon: (props: any) => <Feather name="user" {...props} />, component: Profile },
];

export default menus;
