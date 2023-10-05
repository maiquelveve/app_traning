import { Training } from "../../../models";

export const verifyTrainingIsTrainer = async ({ 
  training_id, 
  user_trainer_id 
}: IVerifyTrainingIsTrainerProps): Promise<IValidationSystemReturn> => {
  try {
    let returned: IValidationSystemReturn = { error: false, message: "" };

    const training = await Training.findAll({ where: { id: training_id, user_trainer_id } });

    if(!training.length) {
      returned = { error: true, message: "Treino inexistente no sistema." };
    }

    return returned;

  } catch (error: any) {
    throw Error(error);
  }
};
