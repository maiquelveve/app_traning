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

interface IModalModality {
  handleClose: () => void;
  open: boolean;
}

interface ICreateModalityProps {
  modality: string;
  modality_type: string;
}

type THandleSerchToolbarDefaultProps = {
  filter: string; 
  modality_type_id?: number;
}

type THandleSerchToolbarDefaultContextProps = THandleSerchToolbarDefaultProps & {
  pageCurrent: number;
  perPageCurrent: number;
}
