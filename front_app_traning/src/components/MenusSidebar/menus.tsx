import { List, Stack } from "@mui/material";

import { ListItemsMenu } from "./ListItemsMenu";

export const Menus: React.FC<ISidebarMenusProps> = ({ menus }) => {
  return (
    <Stack flex={1}>
      <List>
        {menus.map((menu, index) => (
          <ListItemsMenu key={index} {...menu} />
        ))}
      </List>
    </Stack>
  );
};
