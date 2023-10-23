interface ICardTrainingProps {
  title: string;
  subTitle?: string;
  img: string;
  desc: string;
  handleClick: () => void;
}

interface ITrainingSelectorProps {
  handleClickClass: () => void;
  handleClickTraining: () => void;
}

interface ITrainingListData {
  id: number;
  traning: string;
  tag: string;
  modality: string;
}

interface ITableToolbarSelectedTrainingProps {
  selectedData: ITrainingListData | null;
  disableSelectedData: () => void;
}
