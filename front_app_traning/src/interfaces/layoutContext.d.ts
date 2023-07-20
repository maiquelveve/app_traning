type TThemeEnum = "light" | "dark"

interface ILayoutContext {
  themeCurrent: TThemeEnum;
  toogleTheme: () => void;
}
