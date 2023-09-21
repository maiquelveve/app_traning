interface IModalitiesPageContext {
  handleChangePerPageCurrent: (props: IPerPageCurrentProps) => void;
  handleChangePageCurrent: (props: IPageCurrentProps) => void;
  handleSetTotalPage: (value: number) => void;
  handleChangeFilterSearch: (value: string) => void;
  handleChangeModalityTypeId: (value: number) => void;
  handleSetModalities: (modalities: IModality[]) => void;
  handleSearch: (data: THandleSerchToolbarDefaultProps) => void;
  handleChangeLoadingModalities: (boolean: boolean) => void;
  handleModalityCreate: (props: IModalityCreateProps) => Promise<void>;
  modalities: IModality[];
  loadingModalities: boolean;
  totalPage: number;
  pageCurrent: number;
  perPageCurrent: number;
  filterSearch: React.MutableRefObject<string>;
  modalityTypeId: React.MutableRefObject<number | undefined>;
}
