interface IHeaderModalDefaultProps {
  handleClose: () => void;
  title: string;
} 

interface IRootModalDefaultProps extends IAppProps {
  handleClose: () => void;
  open: boolean;
  maxWidth?: TMaxWhidthModal
}

type TMaxWhidthModal = "xs" | "sm" | "md" | "lg" | "xl";
