import { Avatar, Box, Button, CardActions, CardContent, CardHeader, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

import { CardComponent, Page, TextLoadingButton, catchDefalutAlert, defaultAlert } from "../../../components";

export const Profile: React.FC = () => {

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
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
    onSubmit: async (values) => {
      try {
        console.log(values);
        defaultAlert({ messages:["response.data.errors"], type: "error", position: "top-start" });
      } catch (err) {
        catchDefalutAlert();
      }
    }
  });
  
  const user = {
    avatar: "/assets/avatars/avatar-anika-visser.png",
    city: "Los Angeles",
    country: "USA",
    jobTitle: "Senior Developer",
    name: "Anika Visser",
    timezone: "GTM-7"
  };
  
  return(
    <Page title="Perfil">
      <Grid
        container
        spacing={2}
        component={Box}
        display="flex"
        justifyContent="center"
      >
        <Grid
          item
          xs={12}
          lg={4}
        >
          <CardComponent>
            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
              <CardContent>
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <Avatar
                    src={user.avatar}
                    sx={{
                      height: 80,
                      mb: 2,
                      width: 80
                    }}
                  />
                  <Typography
                    gutterBottom
                    variant="h5"
                  >
                    {user.name}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    variant="body2"
                  >
                    {user.city} {user.country}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    variant="body2"
                  >
                    {user.timezone}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant="text"
                >
                  Upload picture
                </Button>
              </CardActions>
            </Box>
          </CardComponent>
        </Grid>
      
        <Grid
          item
          xs={12}
          lg={8}
        >
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
                    // lg={6}
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
                    // lg={6}
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
                <Box display="flex" justifyContent="flex-end">
                  <Button
                    size="large"
                    sx={{ mt: 3, borderRadius: 5 }}
                    type="submit"
                    variant="contained"
                  >
                    <TextLoadingButton isLoading={formik.isSubmitting} text="Salvar" />
                  </Button>
                </Box>
              </CardActions>
            </form>
          </CardComponent>
        </Grid>
      </Grid>
    </Page>
  );
};
