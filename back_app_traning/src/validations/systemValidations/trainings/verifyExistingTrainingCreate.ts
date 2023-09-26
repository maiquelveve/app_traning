import { Training } from "../../../models";

export const verifyExistingTrainingCreate = async ({ 
  tag, 
  modality_id, 
  training, 
  user_trainer_id 
}: IVerifyExistingTrainingCreateProps): Promise<IValidationSystemReturn> => {

  try {
    const isExistTraining = await Training.findOne({ where: { tag, training, modality_id, user_trainer_id } });
    if(isExistTraining) {
      return { error: true, message: "Treino já cadastrado." };
    }
     
    return { error: false, message: "" };
     
  } catch (error: any) {
    throw Error(error);
  }
};
