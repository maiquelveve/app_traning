interface IModality {
  id?: number;
  name: string;
  type: string; // alterar aqui
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
  handleSerch: (props: THandleSerchToolbarDefaultProps) => void;
}
