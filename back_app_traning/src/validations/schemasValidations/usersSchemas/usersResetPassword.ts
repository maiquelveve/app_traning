import * as yup from "yup";

export const usersResetPasswordSchemas: yup.ObjectSchema<IUserResetPasswordProps> = yup.object().shape({
  email: yup
    .string()
    .required("Email é obrigatório.")
    .email("Email invalido."),
});
