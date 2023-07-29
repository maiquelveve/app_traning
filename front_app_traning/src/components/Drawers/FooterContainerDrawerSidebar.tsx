import { 
  Box, 
  Divider, 
  List, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
} from "@mui/material";
import { PersonAdd } from "@mui/icons-material";

export const FooterContainerDrawerSidebar: React.FC = () => {
  return(
    <Box>
      <Divider />
      <List component="nav">
        <ListItemButton onClick={() => {}}>
          <ListItemIcon>
            <PersonAdd />
          </ListItemIcon>
          <ListItemText primary={"Criar uma conta"} />
        </ListItemButton>
      </List> 
    </Box>
  );
};
