
interface ITraining {
  id?: number;
  tag: string;
  training: string;
  video_url: string;
  trainer: IUser;
  modality: IModality;
  trainingDetails: ITrainingDetails[];
}

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

interface ISearchTrainingFiltersProps {
  searchTraining?: string;
  modality_id?: number;
  page: number;
  perPage: number;
}

interface ITrainingListData {
  id: number;
  training: string;
  tag: string;
  modality: Omit<IModality, "id" | "modalityType">;
}

interface ITableToolbarSelectedTrainingProps {
  selectedData: ITrainingListData | null;
  disableSelectedData: () => void;
}
