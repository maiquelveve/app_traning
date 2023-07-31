import React, { useState, useMemo, useCallback } from "react";
import { Badge, Box, IconButton } from "@mui/material";
import { AccountCircle, Mail, Notifications, MoreVert} from "@mui/icons-material";

import { AppBarDefault } from "../AppBarDefault";
import { renderMenu } from "./renderMenu";
import { renderMobileMenu } from "./renderMobileMenu";

export const AppAuthenticated: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);

  const menuId = useMemo(() => "primary-search-account-menu", []);
  const mobileMenuId = useMemo(() => "primary-search-account-menu-mobile", []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);
  
  const handleMobileMenuClose = useCallback(() => {
    setMobileMoreAnchorEl(null);
  }, []);

  const handleMobileMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  }, []);

  const handleProfileMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  return (
    <AppBarDefault>
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <Mail />
          </Badge>
        </IconButton>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <Notifications />
          </Badge>
        </IconButton>
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </Box>
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="show more"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
          color="inherit"
        >
          <MoreVert />
        </IconButton>
      </Box>      
      {renderMobileMenu({
        handleMobileMenuClose,
        handleProfileMenuOpen,
        mobileMenuId,
        mobileMoreAnchorEl
      })}
      {renderMenu({ 
        anchorEl,
        handleMenuClose,
        menuId,
      })}
    </AppBarDefault>
  );
};
