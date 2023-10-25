interface IModalitiesPageContext {
  handleChangePerPageCurrent: (props: IPerPageCurrentProps) => void;
  handleChangePageCurrent: (props: IPageCurrentProps) => void;
  handleChangeFilterSearch: (value: string) => void;
  handleChangeModalityTypeId: (value: number) => void;
  handleSetModalities: (modalities: IModality[]) => void;
  handleSearch: (data: THandleSerchToolbarDefaultProps) => void;
  handleChangeLoadingModalities: (boolean: boolean) => void;
  handleModalityCreate: (props: IModalityCreateProps) => Promise<boolean | undefined>;
  handleModalityUpdate: (props: IModalityUpdateProps) => Promise<boolean | undefined>;
  handleVerifyModalityType: (props:IVerifyModalityTypeProps) => IReturnVerifyModalityType;
  modalities: IModality[];
  modalitiesTypes: IModalityType[];
  loadingModalities: boolean;
  totalPage: number;
  pageCurrent: number;
  perPageCurrent: number;
  filterSearch: React.MutableRefObject<string>;
  modalityTypeId: React.MutableRefObject<number | undefined>;
}

interface IVerifyModalityTypeProps {
  modalitiesTypes: IModalityType[]; 
  modality_type_text: string
}

interface IReturnVerifyModalityType {
  modality_type_id: number | undefined;
}
