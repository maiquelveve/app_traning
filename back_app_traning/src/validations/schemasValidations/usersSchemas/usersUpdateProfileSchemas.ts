import * as yup from "yup";

export const usersUpdateProfileSchemas: yup.ObjectSchema<IUserUpdateProfile> = yup.object().shape({
  name: yup
    .string()
    .required("Nome é obrigatório.")
    .min(3, "Nome deve ter no mínimo 3 caracteres.")
    .max(50, "Nome deve ter no máximo 50 caracteres."),
  email: yup
    .string()
    .required("Email é obrigatório.")
    .email("Email invalido.")
});
