type TPagePosition = "center" | "flex-start" | "flex-end";

interface ILayoutProps extends IAppProps, IHeaderProps {
  pagePosition?: TPagePosition;
}
