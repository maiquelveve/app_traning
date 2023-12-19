import { FlatList } from "native-base";
import { Entypo } from "@expo/vector-icons";

import { Layout } from "@src/components/Layout";
import { useAuthUserContext } from "@src/context/AuthUserContext";
import { AcessMenusGenerator } from "@src/components/AcessMenusGenerator";

export const Home = () => {
  const { getToken, getUserAuth, getProfilesUserAuth } = useAuthUserContext();

  console.log("HOME USER PROFILES", getProfilesUserAuth());
  console.log("HOME USER AUTH", getUserAuth());
  console.log("HOME TOKEN", getToken());

  const menus: IMenusGeneratorProps[] = [
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

  return (
    <Layout headerType={"TAB"} pagePosition="flex-start" >
      <FlatList 
        data={menus} 
        renderItem={({ item }) => <AcessMenusGenerator  {...item} />}
      />
    </Layout>
  );
};
