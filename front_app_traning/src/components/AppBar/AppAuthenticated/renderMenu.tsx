import { useCallback } from "react";
import { Box, Divider, ListItemIcon, Menu, MenuItem, Typography } from "@mui/material";
import { ManageAccounts, SyncLock, SettingsApplications } from "@mui/icons-material";

import { useAuthUserContext } from "../../../context";
import { useNavigate } from "react-router-dom";

export const renderMenu = ({ anchorEl, handleMenuClose, menuId}: IRenderMenuProps) => {
  const navigate = useNavigate();

  const { isTrainerProfiles } = useAuthUserContext();
  const isMenuOpen = Boolean(anchorEl);

  const handleNavigate = useCallback((to: string) => {
    handleMenuClose();
    navigate(to);
  }, []);

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
      <MenuItem onClick={() => handleNavigate("/perfil")}>
        <ListItemIcon>
          <ManageAccounts fontSize="small" />
        </ListItemIcon>
        <Typography variant="subtitle1">Perfil</Typography>
      </MenuItem>
      <MenuItem onClick={() => handleNavigate("/troca_senha")}>
        <ListItemIcon>
          <SyncLock fontSize="small" />
        </ListItemIcon>
        <Typography variant="subtitle1">Troca Senha</Typography>
      </MenuItem>
      {isTrainerProfiles &&
        <Box>
          <Divider />
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <SettingsApplications fontSize="small" />
            </ListItemIcon>
            <Typography variant="subtitle1">Minha Conta</Typography>
          </MenuItem>
        </Box>
      }
    </Menu>
  );
};
