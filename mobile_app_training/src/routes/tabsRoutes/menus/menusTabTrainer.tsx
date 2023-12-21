import { Entypo, MaterialIcons } from "@expo/vector-icons";

import { Class } from "@src/screens/trainings/Class";
import { Training } from "@src/screens/trainings/Training";
/**SOMENTE DE EXPLO ESSA PARTE AGORA!!!!!*/
export const menusTabTrainer: ITabBarMenu[] = [
  { route: "training", label: "treino", Icon: (props: any) => <Entypo name="home" {...props} />, component: Training },
  { route: "class", label: "aula", Icon: (props: any) => <MaterialIcons name="fitness-center" {...props} />, component: Class },
];
