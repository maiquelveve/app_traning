import { CLASS_MODALITY_PT, TRAINING_MODALITY_PT, CLASS_MODALITY_SYSTEM } from "../../config";

export const modalitiesTypesConversion = (modality_type_name: string) => {
  return modality_type_name.toUpperCase() === CLASS_MODALITY_SYSTEM.toUpperCase() 
    ? 
    CLASS_MODALITY_PT.toUpperCase() 
    : 
    TRAINING_MODALITY_PT.toUpperCase();
};
