interface IPageCurrent {
  pageCurrent: number;
}

interface IPerPageCurrent {
  perPageCurrent: number;
}

interface IChangePageAndPerPage {
  handleChangePageCurrent: (props: IPageCurrent) => void;
  handleChangePerPageCurrent: (props: IPerPageCurrent) => void;
  pageCurrent: number;
  perPageCurrent: number;
}
