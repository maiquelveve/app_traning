import { useCallback, useState, useEffect } from "react";
import { TextField, Box, Tooltip, Autocomplete, Stack, Button } from "@mui/material";

import { useFormik } from "formik";
import * as Yup from "yup";

import { LoadingSimple, ModalDefault } from "../../../../../components";

export const ModalCreate: React.FC<IModalModality> = ({ handleClose, open }) => {
  const [modalitiesTypes, setModalitiesTypes] = useState<IModalityType[]>([]);
  const [loading, setLoading] = useState(true);

  const handleSaveModality = useCallback<(props: ICreateModalityProps) => void>(({ modality, modality_type }) => {
    const modality_type_id = modalitiesTypes.find(modalityType => modalityType.type === modality_type)?.id;
    console.log("CREATE MODALITY",  modality, modality_type_id);
    handleCloseItModal();
  }, []);

  const handleCloseItModal = useCallback(() => {
    formik.resetForm();
    handleClose();
  }, []);

  useEffect(() => {
    setModalitiesTypes([
      { id: 2, type: "Aula",},
      { id: 1, type: "Treino"},
      { id: 2, type: "Luta",},
      { id: 1, type: "corrida"},
      { id: 2, type: "pulo",},
      { id: 1, type: "jiu"},
      { id: 2, type: "muy thai",},
      { id: 1, type: "Treino judo"},
      { id: 2, type: "cuncional",},
      { id: 1, type: "dança"},
      { id: 2, type: "zumba",},
      { id: 1, type: "fiso"},
    ]);
    setLoading(false);
  }, []);

  const formik = useFormik({
    initialValues: {
      modality: "",
      modality_type: "",
      submit: null
    },
    validationSchema: Yup.object({
      modality: Yup
        .string()
        .min(3, "Modalidade deve conter 3 caracteres no mínimo.")
        .max(50, "Modalidade deve conter 50 caracteres no máximo.")
        .required("Modalidade é obrigatória."),
      modality_type: Yup
        .string()
        .min(3, "Modalidade Tipo deve conter 3 caracteres no mínimo.")
        .max(50, "Modalidade Tipo deve conter 50 caracteres no máximo.")
        .required("Modalidade Tipo é obrigatório."),
    }),
    onSubmit: async ({ modality, modality_type }) => {
      handleSaveModality({ modality, modality_type});
    }
  });

  return (
    <ModalDefault.Root handleClose={handleCloseItModal} open={open} >
      <ModalDefault.Header title="Modalidades" handleClose={handleCloseItModal} />
      <ModalDefault.Container>
        <form
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <Box component={Stack} spacing={5} py={5} height={loading ? 232 : "auto"} justifyContent="center">
            {loading ? 
              <Box mr={2} display="flex" alignItems="center" justifyContent="center">
                <LoadingSimple size={35} /> 
              </Box>
              :
              <>
                <Tooltip title="Informe a Modalidade" placement="top">
                  <TextField
                    error={!!(formik.touched.modality && formik.errors.modality)}
                    helperText={formik.touched.modality && formik.errors.modality}
                    label="Modalidades"
                    name="modality"
                    fullWidth
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.modality}
                    type="modality"   
                  />
                </Tooltip>

                <Tooltip title="Escolha um Tipo da Modalidade" placement="top">
                  <Autocomplete
                    freeSolo
                    value={formik.values.modality_type} 
                    options={modalitiesTypes.map(modalityType => ({ label: modalityType.type }) )}
                    onInputChange={(_, newInputValue) => formik.setFieldValue("modality_type", newInputValue) }
                    renderInput={(params) => (
                      <TextField 
                        {...params} 
                        label="Tipos" 
                        variant="outlined" 
                        error={!!(formik.touched.modality_type && formik.errors.modality_type)}
                        helperText={formik.touched.modality_type && formik.errors.modality_type}
                      />
                    )}
                  />
                </Tooltip>
              </>
            }
          </Box>
        </form>  
      </ModalDefault.Container>
      <ModalDefault.Footer>
        {loading ? <LoadingSimple size={34} /> :
          <Button 
            autoFocus 
            variant="contained"
            type="submit"
            disabled={loading}
            onClick={() => formik.submitForm()}
          >
          SALVAR
          </Button>
        }
      </ModalDefault.Footer>
    </ModalDefault.Root>
  );
};
