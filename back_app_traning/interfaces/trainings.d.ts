interface ITrainingCreateUpdate {
  id?: number;
  tag: string;
  training: string;
  modality_id: number;
  video_url: string;
  details: ITrainingDetail[]
}

interface ITrainingDetail {
  description: string;
  value: string;
}
