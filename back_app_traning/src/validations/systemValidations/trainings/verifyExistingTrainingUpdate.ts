import { operatorsDB } from "../../../helpers";
import { Training } from "../../../models";

export const verifyExistingTrainingUpdate = async ({ 
  id,
  tag, 
  modality_id, 
  training, 
  user_trainer_id, 
}: IVerifyExistingTrainingUpdateProps): Promise<IValidationSystemReturn> => {
  try {
    const isExistTraining = await Training.findOne({ 
      where: { 
        tag, training, modality_id, user_trainer_id,
        [operatorsDB.not]: {
          id
        }
      }
    });

    if(isExistTraining) {
      return { error: true, message: "Treino já cadastrado." };
    }
     
    return { error: false, message: "" };

  } catch (error: any) {
    throw Error(error);
  }
};
