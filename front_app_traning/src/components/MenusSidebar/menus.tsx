import { 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon,
  ListItemText, 
  Stack, 
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

export const Menus: React.FC<ISidebarMenusProps> = ({ menus }) => {
  return (
    <Stack flex={1}>
      <List>
        {menus.map((menu, index) => (
          <ListItem key={menu.name} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={menu.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};
