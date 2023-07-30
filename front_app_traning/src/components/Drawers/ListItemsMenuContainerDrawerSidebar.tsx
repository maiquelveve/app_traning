import { Box, List } from "@mui/material";

import { Menus } from "../index";
import { useAuthUserContext } from "../../context";
import { getSidebarMenus } from "../../utils";

export const ListItemsMenuContainerDrawerSidebar: React.FC = () => {

  const { profilesUsersCurrent } = useAuthUserContext();
  const menus = getSidebarMenus({ usersProfiles: profilesUsersCurrent });
  
  return(
    <Box flex={1}>
      <List component="nav">
        <Menus menus={menus} />
      </List> 
    </Box>
  );
};
