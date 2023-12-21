interface ITabBarMenu {
  route: string;
  label: string;
  Icon: (props: any) => React.JSX.Element;
  component: () => React.JSX.Element,
}

interface ITabRoutesProps {
  menus: ITabBarMenu[];
}
