import { Box, Button, CardActions, CardContent, Grid, TextField, useMediaQuery, useTheme } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

import { TextLoadingButton, catchDefalutAlert, defaultAlert } from "../../../../../components";

export const FormChangePassword: React.FC = () => {
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  
  const formik = useFormik({
    initialValues: {
      passwordCurrent: "",
      newPassword: "",
      confirmPassword: "",
      submit: null
    },
    validationSchema: Yup.object({
      passwordCurrent: Yup
        .string()
        .min(5, "Senha não pode ser menor que 5 caracteres.")
        .max(255, "Senha não pode ser maior que 255 caracteres.")
        .required("Senha é obrigatória."),
      newPassword:Yup
        .string()
        .min(5, "Nova Senha não pode ser menor que 5 caracteres.")
        .max(255, "Nova Senha não pode ser maior que 255 caracteres.")
        .required("Nova Senha é obrigatória."),
      confirmPassword: Yup
        .string()
        .required("Repita Nova Senha é obrigatório.")
        .oneOf([Yup.ref("newPassword")], "Nova Senha diferente do Confirme a Senha"),
    }),
    onSubmit: async (values) => {
      try {
        console.log(values);
        defaultAlert({ messages:["Usuário atualizado com sucesso!"], type: "success", position: "top-end" });
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
      {/*LG=650 MD=550 SM=450 XS=350 */}
      <Box width={ lgUp ? 650 : mdUp ? 550 : smUp ? 450 : 350 } >
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={12}
            >
              <TextField
                error={!!(formik.touched.passwordCurrent && formik.errors.passwordCurrent)}
                helperText={formik.touched.passwordCurrent && formik.errors.passwordCurrent}
                label="Senha Atual"
                name="passwordCurrent"
                fullWidth
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.passwordCurrent}
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                error={!!(formik.touched.newPassword && formik.errors.newPassword)}
                helperText={formik.touched.newPassword && formik.errors.newPassword}
                label="Nova Senha"
                name="newPassword"
                fullWidth
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.newPassword}
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                error={!!(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                label="Confirma Senha"
                name="confirmPassword"
                fullWidth
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.confirmPassword}
              />
            </Grid>
          </Grid>
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button
              size="large"
              sx={{ mt: 3, borderRadius: 5 }}
              type="submit"
              variant="contained"
              fullWidth
            >
              <TextLoadingButton isLoading={formik.isSubmitting} text="Salvar" />
            </Button>
          </CardActions>
        </CardContent>
      </Box>
    </form>
  );
};
