import { List, Stack } from "@mui/material";

import { ListItemsMenu } from "./ListItemsMenu";
import { useAuthUserContext } from "../../context";
import { getSidebarMenus } from "../../utils";

export const Menus: React.FC = () => {
  
  const { profilesUsersCurrent } = useAuthUserContext();
  const menus = getSidebarMenus({ usersProfiles: profilesUsersCurrent });

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
