import { useCallback, useState, useEffect } from "react";
import { TextField, Box, Tooltip, Autocomplete, Stack, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

import { LoadingSimple, ModalDefault, catchDefalutAlert, defaultAlert } from "../../../../components";
import { useModalitiesPageContext } from "../../../../context/ModalitiesPageContext";
import { modalitiesTypesConversion } from "../../../../utils";
import { apiService } from "../../../../services";

export const ModalCreate: React.FC<IModalModality> = ({ handleClose, open }) => {
  const [modalitiesTypes, setModalitiesTypes] = useState<IModalityType[]>([]);
  const [loading, setLoading] = useState(true);

  const { handleModalityCreate } = useModalitiesPageContext();

  const handleCloseItModal = useCallback(() => {
    formik.resetForm();
    handleClose();
  }, []);

  useEffect(() => {
    try {
      const fetch = async () => {
        const response = await apiService.get<IReturnedRequest>("/modalitiesTypes");
        const data = response.data.data[0].modalitiesTypes.map((modality:  IModalityType): IModalityType => {
          return {
            type: modalitiesTypesConversion(modality.type),
            id: modality.id
          };
        }); 
        setModalitiesTypes(data);
      };
      fetch();

    } catch (error) {
      catchDefalutAlert();

    } finally {
      setLoading(false);
    }
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
      setLoading(true);
      
      try {
        const modality_type_id = modalitiesTypes.find(modalityType => modalityType.type === modality_type)?.id;
        if(!modality_type_id) {
          defaultAlert({ messages: ["Tipo de Modalidade invalido."], type: "error", position: "top" });
        } else {
          await handleModalityCreate({ modality, modality_type_id });
          handleCloseItModal();
        }
      } finally {
        setLoading(false);
      }
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
