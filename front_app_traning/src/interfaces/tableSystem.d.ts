interface IPageCurrentProps {
  pageCurrent: number;
}

interface IPerPageCurrentProps {
  perPageCurrent: number;
}

interface IChangePageAndPerPage {
  handleChangePageCurrent: (props: IPageCurrentProps) => void;
  handleChangePerPageCurrent: (props: IPerPageCurrentProps) => void;
  pageCurrent: number;
  perPageCurrent: number;
}
