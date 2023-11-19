type TPagePosition = "center" | "flex-start" | "flex-end";

interface IPageProps extends IAppProps {
  pagePosition?: TPagePosition;
}
