interface IVerifyEmailExistProps {
  id?: number;
  email: string;
  typeOperation: "edit" | "create";
}
interface IVerifyExistingModalityCreateProps {
  modality: string;
}

interface IVerifyExistingModalityUpdateProps {
  id: number;
  modality: string;
}

interface IVerifyTrainingIsTrainerProps {
  training_id: number;
  user_trainer_id: number
}
interface IVerifyExistingTrainingCreateProps {
  tag: string;
  training: string;
  modality_id: number;
  user_trainer_id: number
}

interface IVerifyExistingTrainingUpdateProps {
  id: number;
  tag: string;
  training: string;
  modality_id: number;
  user_trainer_id: number
}

interface IVerifyTrainingDetailsProps {
  details: ITrainingDetail[]
}

interface IValidationSystemReturn {
  message: string;
  error: boolean;
}
