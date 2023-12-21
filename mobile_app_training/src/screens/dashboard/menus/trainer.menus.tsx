import { Entypo } from "@expo/vector-icons";

export const trainerMenus: IMenusGeneratorProps[] = [
  {
    tag: "treinamento",
    title: "Modalidades",
    description: "Acesse aqui para ver as modalidades do sistema.",
    navigationRoute: "init_auth",
    Icon: () => <Entypo name="typing" size={24} color="black" />
  },
  {
    tag: "treinamento",
    title: "Treinamentos",
    description: "Acesse aqui para acessar seus trainamentos.",
    navigationRoute: "trainers",
    Icon: () => <Entypo name="typing" size={24} color="black" />
  }
];
