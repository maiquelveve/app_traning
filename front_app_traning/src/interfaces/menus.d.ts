interface ISidebarMenus {
  name: string;
  Icon: JSX.Element;
  to: string;
}

interface ISidebarMenusProps {
  menus: ISidebarMenus[];
}
