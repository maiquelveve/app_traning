import { Entypo } from "@expo/vector-icons";

export const accountMenus: IMenusGeneratorProps[] = [
  {
    tag: "USUÁRIO",
    title: "Perfil",
    description: "Acesse aqui para ver seu dados de usuário.",
    handleNavigate: () => console.log("aqui"),
    Icon: () => <Entypo name="typing" size={24} color="black" />
  },
  {
    tag: "USUÁRIO",
    title: "Trocar Senha",
    description: "Acesse aqui para alterar a senha.",
    handleNavigate: () => console.log("aqui"),
    Icon: () => <Entypo name="typing" size={24} color="black" />
  },
  {
    tag: "USUÁRIO",
    title: "Perfil",
    description: "Acesse aqui para ver seu dados de usuário.",
    handleNavigate: () => console.log("aqui"),
    Icon: () => <Entypo name="typing" size={24} color="black" />
  },
  {
    tag: "USUÁRIO",
    title: "Perfil",
    description: "Acesse aqui para ver seu dados de usuário.",
    handleNavigate: () => console.log("aqui"),
    Icon: () => <Entypo name="typing" size={24} color="black" />
  },
  {
    tag: "USUÁRIO",
    title: "Perfil",
    description: "Acesse aqui para ver seu dados de usuário.",
    handleNavigate: () => console.log("aqui"),
    Icon: () => <Entypo name="typing" size={24} color="black" />
  }
];
