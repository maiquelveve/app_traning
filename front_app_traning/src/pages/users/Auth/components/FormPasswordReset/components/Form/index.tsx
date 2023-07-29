import { useFormik } from "formik";
import { Button, Stack, TextField } from "@mui/material";
import * as Yup from "yup";

import { catchDefalutAlert, defaultAlert, TextLoadingButton } from "../../../../../../../components";

import { apiService } from "../../../../../../../services";

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
        const { email } = values;
        const responde = await apiService.post<IReturnedRequest>("/users/resetPassword", { email });

        if(responde.data.isSuccess) {
          defaultAlert({ 
            messages: [`Nova senha enviada para: ${values.email.toUpperCase()}`], 
            type: "success", 
            position: "top-start" 
          });
          values.email = "";

        } else {
          defaultAlert({ 
            messages: responde.data.errors, 
            type: "error", 
            position: "top-start" 
          });
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
