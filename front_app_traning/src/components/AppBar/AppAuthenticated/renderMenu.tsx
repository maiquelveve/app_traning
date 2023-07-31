import { Divider, ListItemIcon, Menu, MenuItem, Typography } from "@mui/material";
import { ManageAccounts, SyncLock, SettingsApplications } from "@mui/icons-material";

import { useAuthUserContext } from "../../../context";

export const renderMenu = ({ anchorEl, handleMenuClose, menuId}: IRenderMenuProps) => {
  const { isTrainerProfiles } = useAuthUserContext();
  const isMenuOpen = Boolean(anchorEl);

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <ListItemIcon>
          <ManageAccounts fontSize="small" />
        </ListItemIcon>
        <Typography variant="subtitle1">Perfil</Typography>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <ListItemIcon>
          <SyncLock fontSize="small" />
        </ListItemIcon>
        <Typography variant="subtitle1">Troca Senha</Typography>
      </MenuItem>
      {isTrainerProfiles &&
        <>
          <Divider />
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <SettingsApplications fontSize="small" />
            </ListItemIcon>
            <Typography variant="subtitle1">Minha Conta</Typography>
          </MenuItem>
        </>
      }
    </Menu>
  );
};
