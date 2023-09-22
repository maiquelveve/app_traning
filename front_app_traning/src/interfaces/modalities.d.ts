interface IModality {
  id?: number;
  modality: string;
  modalityType: IModalityType
}

interface IModalityCreateProps {
  modality: string;
  modality_type_id: number;
}

interface IModalityUpdateProps {
  id: number;
  modality: string;
  modality_type_id: number;
}

type THandleToolbarSelectedProps = {
  modalityCurrent: IModality | null;
}

interface ITableToolbarSelectedProps {
  selectedData: IModality | null;
  disableSelectedData: () => void;
}

interface IModalModality {
  handleClose: () => void;
  open: boolean;
}

interface IFormModalities {
  formik: any;
  loading: boolean
  modalitiesTypes: IModalityType[]
}

interface IButtonSaveModalities {
  loading: boolean;
  submitForm: () => void;
}

interface IUpdateModalModalityProps {
  selectedModality: IModality;
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
