import { Modality } from "../../../models";

export const verifyExistingModalityCreate = async ({ 
  modality 
}: IVerifyExistingModalityCreateProps): Promise<IValidationSystemReturn> => {

  try {
    const isExistModality = await Modality.findOne({ where: { modality }});

    if(isExistModality) {
      return { error: true, message: "Modalidade já existe no sistema."};
    }

    return { error: false, message: ""};

  } catch (error: any) {
    throw Error(error);
  }
};
