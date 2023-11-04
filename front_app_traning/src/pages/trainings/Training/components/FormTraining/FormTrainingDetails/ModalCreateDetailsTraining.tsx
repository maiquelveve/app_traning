import { useCallback } from "react";
import { Box, Button, Grid, Tooltip, TextField, Stack} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

import { ModalDefault, catchDefalutAlert } from "../../../../../../components";

export const ModalCreateDetailsTraining: React.FC<IModalProps & ITrainingDetailsCreateActionsProps> = ({
  handleSaveTrainingDateils,  
  handleClose, 
  open 
}) => {

  const formik = useFormik({
    initialValues: {
      description: "",
      value: "",
      submit: null
    },
    validationSchema: yup.object({
      description: yup
        .string()
        .min(3, "Descrição deve conter 3 caracteres no mínimo.")
        .max(80, "Descrição deve conter 80 caracteres no máximo.")
        .required("Descrição é obrigatória."),
      value: yup
        .string()
        .min(1, "Valor deve conter 1 caracteres no mínimo.")
        .max(80, "Valor deve conter 80 caracteres no máximo.")
        .required("Valor é obrigatório."),
    }),
    onSubmit: async (data) => {
      try {
        handleSaveTrainingDateils(data);
        handleCloseItModal();
      } catch (error) {
        catchDefalutAlert();
      }
    }
  });

  const handleCloseItModal = useCallback(() => {
    formik.resetForm();
    handleClose();
  }, []);
  
  return (
    <ModalDefault.Root handleClose={handleCloseItModal} open={open} maxWidth="xs">
      <ModalDefault.Header title="Cadastra Detalhes do Treino" handleClose={handleCloseItModal} />
      <ModalDefault.Container>
        <form
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <Box component={Stack} spacing={5} py={5} height="auto" justifyContent="center">
            <Grid container spacing={2}>
              <Grid container item>
                <Grid item xs={12}>
                  <Tooltip title="Informe a Descrição" placement="top">
                    <TextField
                      error={!!(formik.touched.description && formik.errors.description)}
                      helperText={formik.touched.description && formik.errors.description}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.description}
                      label="Descrição"
                      name="description"
                      fullWidth
                    />
                  </Tooltip>
                </Grid>
              </Grid>
              <Grid container item>
                <Grid item xs={12}>
                  <Tooltip title="Informe o Valor" placement="top">
                    <TextField
                      error={!!(formik.touched.value && formik.errors.value)}
                      helperText={formik.touched.value && formik.errors.value}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.value}
                      label="Valor"
                      name="value"
                      fullWidth
                    />
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </form> 
      </ModalDefault.Container>
      <ModalDefault.Footer>
        <Button onClick={formik.submitForm}>SALVAR</Button>
      </ModalDefault.Footer>
    </ModalDefault.Root>
  );
};
