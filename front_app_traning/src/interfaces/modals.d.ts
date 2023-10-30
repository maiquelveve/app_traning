interface IHeaderModalDefaultProps {
  handleClose: () => void;
  title: string;
} 

interface IRootModalDefaultProps extends IAppProps {
  handleClose: () => void;
  open: boolean;
  maxWidth?: TMaxWhidthModal
}

interface IModalProps {
  handleClose: () => void;
  open: boolean;
}

type TMaxWhidthModal = "xs" | "sm" | "md" | "lg" | "xl";
