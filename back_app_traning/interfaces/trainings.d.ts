interface ITrainingCreateUpdate {
  id?: number;
  tag: string;
  training: string;
  modality_id: number;
  video_url: string;
  details: ITrainingDetailProps[]
}

interface ITrainingDetailProps {
  description: string;
  value: string;
}

interface IParamsTrainingId {
  id: number;
}

interface ITrainingsQueryFilter {
  trainingSearch?: string;
  modality_id?: string;
}
