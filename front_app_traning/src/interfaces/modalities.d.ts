interface IModality {
  id?: number;
  modality: string;
  modalityType: IModalityType
}

type THandleToolbarSelectedProps = {
  modalityCurrent: IModality | null;
}

interface ITableToolbarSelectedProps {
  selectedData: IModality | null;
}

type THandleSerchToolbarDefaultProps = {
  filter: string; 
  modality_type_id?: number;
}

type THandleSerchToolbarDefaultContextProps = THandleSerchToolbarDefaultProps & {
  pageCurrent: number;
  perPageCurrent: number;
}
