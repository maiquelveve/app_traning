import { Box, Button, CardActions, CardContent, CardHeader, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useAuthUserContext } from "../../../../../context";
import { CardComponent, TextLoadingButton, catchDefalutAlert, defaultAlert } from "../../../../../components";

import { apiService } from "../../../../../services";

export const FormProfile: React.FC = () => {
  const { authUserCurrent, setAuthUserCurrent, getToken } = useAuthUserContext();
  
  const formik = useFormik({
    initialValues: {
      name: authUserCurrent ? authUserCurrent.name : "",
      email: authUserCurrent ? authUserCurrent.email : "",
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
    }),
    onSubmit: async ({ email, name }) => {
      try {
        const token = getToken();
        const response = await apiService.put<IReturnedRequest>(
          "users/profile", 
          { name, email }, 
          { 
            headers: { Authorization: token } 
          }
        );

        if(response.data.isSuccess) {
          setAuthUserCurrent({ email, name, avatar_url: authUserCurrent?.avatar_url });
          defaultAlert({ messages:["Usuário atualizado com sucesso!"], type: "success", position: "top-end" });
        } else {
          defaultAlert({ messages: response.data.errors, type: "error", position: "top-end" });
        }
      } catch (err) {
        catchDefalutAlert();
      }
    }
  });

  return(
    <CardComponent> 
      <CardHeader
        subheader="Autualize suas informações"
        title="Meu Perfil"
      />
      <form
        noValidate
        onSubmit={formik.handleSubmit}
      >        
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={12}
              lg={6}
            >
              <TextField
                error={!!(formik.touched.name && formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                label="Nome"
                name="name"
                fullWidth
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="name"
                value={formik.values.name}
              />
            </Grid>
            <Grid
              item
              xs={12}
              lg={6}
            >
              <TextField
                error={!!(formik.touched.email && formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                label="Email"
                name="email"
                fullWidth
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="email"
                value={formik.values.email}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Box display="flex" justifyContent="flex-end" width={101}>
            <Button
              size="large"
              sx={{ mt: 3, borderRadius: 5 }}
              type="submit"
              variant="contained"
              fullWidth
            >
              <TextLoadingButton isLoading={formik.isSubmitting} text="Salvar" />
            </Button>
          </Box>
        </CardActions>
      </form>
    </CardComponent>
  );

};
