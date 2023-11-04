interface ITrainingDetails {
  id?: number;
  description: string;
  value: string;
  training_id: number;
}

interface ITrainingDetailsCreateProps {
  description: string;
  value: string;
}

interface ITrainingDetailsCreateActionsProps {
  handleSaveTrainingDateils: (data: ITrainingDetailsCreateProps) => void;
}

interface ITableListTrainingDetailsProps {
  trainingDetails: ITrainingDetailsCreateProps[];
  handleDeleteDetail: ({ index: number }) => void;
}

interface ITableListTrainingDetailsViewProps {
  trainingDetails: ITrainingDetailsCreateProps[];
}

interface IFormDataViewProps {
  data: FormikValuesTraining;
}

interface IFormTrainingDetailsProps {
  trainingDetails: ITrainingDetailsCreateProps[];
  handleSaveDetails: (props: ITrainingDetailsCreateProps) => void;
  handleDeleteDetail: ({ index: number }) => void;
}
