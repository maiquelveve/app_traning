import * as yup from "yup";

export const usersChangePasswordSchemas: yup.ObjectSchema<IUserChangePassword> = yup.object().shape({
  passwordCurrent: yup
    .string()
    .min(5, "Senha não pode ser menor que 5 caracteres.")
    .max(255, "Senha não pode ser maior que 255 caracteres.")
    .required("Senha é obrigatória."),
  newPassword: yup
    .string()
    .min(5, "Nova Senha não pode ser menor que 5 caracteres.")
    .max(255, "Nova Senha não pode ser maior que 255 caracteres.")
    .required("Nova Senha é obrigatória."),
});
