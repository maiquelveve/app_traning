import { FlatList } from "native-base";

import { MenuCard } from "../MenuCard";

export const AcessMenusGenerator: React.FC<{menus: IMenusGeneratorProps[]}> = ({ menus }) => {
  return(
    <FlatList 
      data={menus} 
      renderItem={({ item }) => <MenuCard  {...item} />}
    />
  );
};
