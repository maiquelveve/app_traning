import { Button, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

import { defaultAlert, catchDefalutAlert } from "../../../../../../../components/Alerts";
import { TextLoadingButton } from "../../../../../../../components/TextLoadingButton";

import { useAuthUserContext } from "../../../../../../../context";
import { apiService } from "../../../../../../../services";

export const Form: React.FC = () => {
  const { setToken } = useAuthUserContext();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email("Email Invalido.")
        .max(255)
        .required("Email é obrigatório."),
      password: Yup
        .string()
        .min(5, "Senha não pode ser menor que 5 caracteres.")
        .max(255, "Senha não pode ser maior que 255 caracteres.")
        .required("Senha é obrigatória.")
    }),
    onSubmit: async (values) => {
      try {
        const { email, password } = values;
        const reponse = await apiService.post<IReturnedRequest>("/users/login", { email, password });

        if(reponse.data.isSuccess) {
          setToken(reponse.data.data[0].token);
          window.location.replace("/");
        } else {
          defaultAlert({ messages: reponse.data.errors, type: "error", position: "top-start" });
        }

      } catch (err) {
        catchDefalutAlert();
      }
    }
  });

  return(
    <form
      noValidate
      onSubmit={formik.handleSubmit}
    >
      <Stack spacing={3}>
        <TextField
          error={!!(formik.touched.email && formik.errors.email)}
          fullWidth
          helperText={formik.touched.email && formik.errors.email}
          label="Email"
          name="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="email"
          value={formik.values.email}
        />
        <TextField
          error={!!(formik.touched.password && formik.errors.password)}
          fullWidth
          helperText={formik.touched.password && formik.errors.password}
          label="Senha"
          name="password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="password"
          value={formik.values.password}
        />
      </Stack>
      <Button
        fullWidth
        size="large"
        sx={{ mt: 3, borderRadius: 5 }}
        type="submit"
        variant="contained"
      >
        <TextLoadingButton isLoading={formik.isSubmitting} text="Entrar" />
      </Button>
    </form>
  );
};
