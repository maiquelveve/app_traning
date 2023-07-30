import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon,
  ListItemText, 
  Stack, 
} from "@mui/material";

export const Menus: React.FC<ISidebarMenusProps> = ({ menus }) => {
  const navigate = useNavigate();

  const handleClick = useCallback((to: string) => {
    navigate(to);
  }, []);

  return (
    <Stack flex={1}>
      <List>
        {menus.map((menu, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => handleClick(menu.to)}>
              <ListItemIcon>
                {menu.Icon}
              </ListItemIcon>
              <ListItemText primary={menu.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};
