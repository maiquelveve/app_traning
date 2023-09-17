interface IHeaderModalDefaultProps {
  handleClose: () => void;
  title: string;
} 

interface IRootModalDefaultProps extends IAppProps {
  handleClose: () => void;
  open: boolean;
}
