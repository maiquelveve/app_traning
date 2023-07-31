import { Menu, MenuItem } from "@mui/material";

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
      <MenuItem onClick={handleMenuClose}>Prefil</MenuItem>
      <MenuItem onClick={handleMenuClose}>Trocar Senha</MenuItem>
      {isTrainerProfiles &&
        <MenuItem onClick={handleMenuClose}>Minha Conta</MenuItem>
      }
    </Menu>
  );
};
