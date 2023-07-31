interface ISidebarMenus {
  name: string;
  Icon: JSX.Element;
  to: string;
}

interface ISidebarMenusProps {
  menus: ISidebarMenus[];
}

interface IRenderMenuProps {
  menuId: string; 
  anchorEl: null | HTMLElement, 
  handleMenuClose: () => void 
}

interface IRenderMobilMenuProps {
  mobileMenuId: string; 
  mobileMoreAnchorEl: null | HTMLElement;
  handleMobileMenuClose: () => void;
  handleProfileMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
}
