interface IModality {
  id?: number;
  name: string;
  type: string;
}

interface ITableToolbarProps {
  selectedData: string
}

type THandleToolbarSelectedIdtProps = {
  id: number
}
interface ITableToolbarSelectedProps extends  ITableToolbarProps {
  handleEdit: (props: THandleToolbarSelectedIdtProps) => void;
  handleDeactivate: (props: THandleToolbarSelectedIdtProps) => void;
}

type THandleSerchToolbarDefaultProps = {
  filter: string; 
  modality_type_id?: number;
}
interface ITableToolbarDefaultProps {
  handleSerch: (props: THandleSerchToolbarDefaultProps) => void;
}
