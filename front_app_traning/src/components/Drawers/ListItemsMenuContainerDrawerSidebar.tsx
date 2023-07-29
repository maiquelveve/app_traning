import { Box, List } from "@mui/material";

import { Menus } from "../index";

export const ListItemsMenuContainerDrawerSidebar: React.FC = () => {
  return(
    <Box flex={1}>
      <List component="nav">
        <Menus menus={[{ name: "teste" }, { name: "teste" }, { name: "teste" }, { name: "teste" }, { name: "teste" }] } />
      </List> 
    </Box>
  );
};
