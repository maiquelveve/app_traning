import * as yup from "yup";

export const usersLoginSchemas: yup.ObjectSchema<IUserLogin> = yup.object().shape({
  email: yup
    .string()
    .required("Email é obrigatório.")
    .email("Email invalido."),
  password: yup
    .string()
    .required("Senha é obrigatória.")
    .min(5, "Senha deve ter no mínimo 5 caracteres.")
    .max(50, "Senha deve ter no máximo 50 caracteres.")
});
