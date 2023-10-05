interface ITrainingDetail {
  id?: number;
  description: string;
  value: string;
  training_id: number;
}

interface ICustomValidationSystemReturnDetailsTraining {
  error: boolean;
  message: string[];
}
