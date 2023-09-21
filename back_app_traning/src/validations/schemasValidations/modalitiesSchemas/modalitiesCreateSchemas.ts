import * as yup from "yup";

export const modalitiesCreateSchemas: yup.ObjectSchema<IModalityCreate> = yup.object().shape({
  modality: yup
    .string()
    .min(3, "Modalidade deve conter 3 caracteres no mínimo.")
    .max(50, "Modalidade deve conter 50 caracteres no máximo.")
    .required("Modalidade é obrigatória."),
  modality_type_id: yup
    .number()
    .required("Modalidade Tipo é obrigatório."),
});
