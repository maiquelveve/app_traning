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
  handleEdit: (props: THandleToolbarSelectedProps) => void;
  handleDeactivate: (props: THandleToolbarSelectedProps) => void;
}

type THandleSerchToolbarDefaultProps = {
  filter: string; 
  modality_type_id?: number;
}
interface ITableToolbarDefaultProps {
  handleSearch: (props: THandleSerchToolbarDefaultProps) => void;
}


interface ITableFooterProps {
  totalPageCont: number;
}
