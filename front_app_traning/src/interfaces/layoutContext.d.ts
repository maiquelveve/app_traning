type TThemeEnum = "light" | "dark"

interface ILayoutContext {
  themeCurrent: TThemeEnum;
  toogleTheme: () => void;
}

interface ILayoutDashboardProps {
  window?: () => Window;
}

interface IPagedProps {
  title?: string;
}
