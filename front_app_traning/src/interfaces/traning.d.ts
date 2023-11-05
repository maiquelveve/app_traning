
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
}

interface ISearchTrainingProps {
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

interface IButtonActionTraining {
  loading: boolean;
  isValid: boolean;
  submitForm: () => void;
}

interface IFormTrainings {
  formik: any;
  loading: boolean;
}

interface IFormCheckProps {
  isValid: boolean;
  isFormInInitial: boolean;
  dataView: FormikValuesTraining;
  dataDetails: ITrainingDetailsCreateProps[];
  errors: FormikErrors<FormikValuesTraining>;
}

interface IFormDataErrorsProps {
  errors: FormikErrors<FormikValuesTraining>
}

interface IFormViewProps {
  data: FormikValuesTraining;
  dataDetails: ITrainingDetailsCreateProps[];
}

interface FormikValuesTraining {
  tag: string;
  training: string;
  modality_id: string;
  video_url: string;
  submit: null;
}

interface ICreateTrainingProps {
  tag: string;
  training: string;
  modality_id: string;
  video_url: string;
  details: ITrainingDetailsCreateProps[];
}

interface ITraningViewUpdateProps {
  id: number;
}
