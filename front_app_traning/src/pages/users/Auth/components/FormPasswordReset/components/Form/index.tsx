import { useFormik } from "formik";
import { Button, Stack, TextField } from "@mui/material";
import * as Yup from "yup";

import { catchDefalutAlert, defaultAlert } from "../../../../../../../components/Alerts";
import { TextLoadingButton } from "../../../../../../../components/TextLoadingButton";

export const Form: React.FC = () => {

  const formik = useFormik({
    initialValues: {
      email: "",
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email("Email Invalido.")
        .max(255)
        .required("Email é obrigatório."),
    }),
    onSubmit: async (values) => {
      try {
        defaultAlert({ title: `Nova senha enviada para: ${values.email.toUpperCase()}`, type: "success", position: "top-start" });
        values.email = "";
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
      </Stack>
      <Button
        fullWidth
        size="large"
        sx={{ mt: 3, borderRadius: 5 }}
        type="submit"
        variant="contained"
      >
        <TextLoadingButton isLoading={formik.isSubmitting} text="Enviar" />
      </Button>
    </form>
  );
};
