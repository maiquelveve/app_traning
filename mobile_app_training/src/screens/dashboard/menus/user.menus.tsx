import { Entypo } from "@expo/vector-icons";

export const userMenus: IMenusGeneratorProps[] = [
  {
    tag: "treinamento",
    title: "Modalidades",
    description: "Acesse aqui para ver as modalidades do sistema.",
    handleNavigate: () => console.log("aqui"),
    Icon: () => <Entypo name="typing" size={24} color="black" />
  },
  {
    tag: "treinamento",
    title: "Modalidades",
    description: "Acesse aqui para ver as modalidades do sistema.",
    handleNavigate: () => console.log("aqui"),
    Icon: () => <Entypo name="typing" size={24} color="black" />
  }
];
