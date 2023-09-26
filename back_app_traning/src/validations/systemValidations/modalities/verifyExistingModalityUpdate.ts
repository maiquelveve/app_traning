import { Modality } from "../../../models";
import { operatorsDB } from "../../../helpers";

export const verifyExistingModalityUpdate = async ({ 
  id,
  modality
}: IVerifyExistingModalityUpdateProps): Promise<IValidationSystemReturn> => {

  try {
    const isExistModality = await Modality.findOne({ 
      where: { 
        modality,
        [operatorsDB.not]: {
          id
        }
      }
    });

    if(isExistModality) {
      return { error: true, message: "Modalidade já caddastrada."};
    }

    return { error: false, message: "" };
    
  } catch (error: any) {
    throw Error(error);
  }
};
