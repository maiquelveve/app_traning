import { useNavigate } from "react-router-dom";
import { 
  Box, 
  Divider, 
  List, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
} from "@mui/material";
import { PersonAdd, Logout } from "@mui/icons-material";

import { useAuthUserContext } from "../../context";

export const FooterContainerDrawerSidebar: React.FC = () => {
  const { getToken, handleLogout } = useAuthUserContext();
  const navigate = useNavigate();
  const token = getToken();

  return(
    <Box>
      <Divider />
      <List component="nav">
        {!token &&
          <ListItemButton onClick={() => navigate("/acessos")}>
            <ListItemIcon>
              <PersonAdd />
            </ListItemIcon>
            <ListItemText primary={"Criar uma conta"} />
          </ListItemButton>
        }
        {token &&
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary={"SAIR"} />
          </ListItemButton>
        }
      </List> 
    </Box>
  );
};
