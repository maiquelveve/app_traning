import { Button, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

import { catchDefalutAlert, defaultAlert } from "../../../../../../../components/Alerts";
import { TextLoadingButton } from "../../../../../../../components/TextLoadingButton";

import { apiService } from "../../../../../../../services";

export const Form: React.FC = () => {

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      submit: null
    },
    validationSchema: Yup.object({
      name: Yup
        .string()
        .min(3, "Nome deve conter 3 caracteres no mínimo.")
        .max(50, "Nome deve conter 50 caracteres no máximo.")
        .required("Nome é obrigatório."),
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
        const { name, email, password } = values;
        const response = await apiService.post<IReturnedRequest>("/users", { name, email, password });

        if(response.data.isSuccess) {
          values.name = "";
          values.email = "";
          values.password = "";
          defaultAlert({ messages: response.data.success, type: "success", position: "top-start" });
        } else {
          defaultAlert({ messages: response.data.errors, type: "error", position: "top-start" });
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
          error={!!(formik.touched.name && formik.errors.name)}
          fullWidth
          helperText={formik.touched.name && formik.errors.name}
          label="Nome"
          name="name"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="name"
          value={formik.values.name}
        />
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
        <TextLoadingButton isLoading={formik.isSubmitting} text="CADASTRAR" />
      </Button>
    </form>
  );
};
