import { MenuCard } from "../MenuCard";

export const AcessMenusGenerator: React.FC<{menus: IMenusGeneratorProps[]}> = ({ menus }) => {
  return(
    <>
      {menus.map((menu, index) => (
        <MenuCard {...menu} key={index} />
      ))}
    </>
  );
};
