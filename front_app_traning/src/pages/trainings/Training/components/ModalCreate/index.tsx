import { useCallback, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import { Box, Typography, Stepper, Step, StepLabel } from "@mui/material";

import { ColorStepperConnector, ModalDefault, catchDefalutAlert } from "../../../../../components";
import { FormTrainingData, FormTrainingDetails, stepsTraining, StepIconTraining, FormButton } from "..";

export const ModalCreate: React.FC<IModalProps> = ({ handleClose, open }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      tag: "",
      training: "",
      modality_id: "",
      video_url: "",
      details: [],
      submit: null
    },
    validationSchema: yup.object({
      tag: yup
        .string()
        .min(3, "TAG deve conter 3 caracteres no mínimo.")
        .max(80, "TAG deve conter 80 caracteres no máximo.")
        .required("TAG é obrigatória."),
      training: yup
        .string()
        .min(3, "Nome do Treino deve conter 3 caracteres no mínimo.")
        .max(80, "Nome do Treino deve conter 80 caracteres no máximo.")
        .required("Nome do Treino é obrigatório."),
      modality_id: yup
        .number().typeError("Modalidade invalida.")
        .required("Modalidade do Treino é obrigatória."),
      video_url: yup
        .string()
        .min(20, "Video URL deve conter 20 caracteres no mínimo.")
        .max(200, "Video URL deve conter 200 caracteres no máximo.")
        .required("Video URL é obrigatória."),
      details: yup    
        .array().of(
          yup.object({
            description: yup
              .string()
              .min(5, ({ value }) => `A Descrição do detalhe '${value}' deve conter 5 caracteres no mínimo.`)
              .max(50, ({ value }) => `A Descrição do detalhe '${value}' deve conter 50 caracteres no máximo.`)
              .required(({ path }) => 
                `${+(path.split("[")[1].split("]"))[0] + 1}º Descrição é obrigatória para os detalhes, reveja os dados informados.`
              ),
            value: yup
              .string()
              .min(1, ({ value }) => `O Valor do detalhe '${value}' deve conter 1 caracteres no mínimo.`)
              .max(25, ({ value }) => `O Valor do detalhe '${value}' deve conter 25 caracteres no máximo.`)
              .required(({ path }) => 
                `${+(path.split("[")[1].split("]"))[0] + 1}º Valor é obrigatório para os detalhes, reveja os dados informados.`
              ),
          })
        )
        .required("Detalhes do Treino são obrigatórios."),
    }),
    onSubmit: async (data) => {
      try {
        setLoading(true);
        console.log("aquiiii", data);
        handleCloseItModal();
      } catch (error) {
        catchDefalutAlert();
      } finally {
        setLoading(false);
      }
    }
  });

  const handleCloseItModal = useCallback(() => {
    formik.resetForm();
    handleReset();
    handleClose();
  }, []);

  const handleNext = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }, []);

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }, []);

  const handleReset = useCallback(() => {
    setActiveStep(0);
  }, []);

  return (
    <ModalDefault.Root handleClose={handleCloseItModal} open={open} maxWidth="lg">
      <ModalDefault.Header title="Treinos" handleClose={handleCloseItModal} />
      <Box mb={3}>
        <Stepper alternativeLabel activeStep={activeStep} connector={<ColorStepperConnector />} >
          {
            stepsTraining.map((label) => {
              const stepProps: { completed?: boolean } = {};
              return (
                <Step key={label} {...stepProps} >
                  <StepLabel StepIconComponent={StepIconTraining}>{label}</StepLabel>
                </Step>
              );
            })
          }
        </Stepper>
      </Box>
      <ModalDefault.Container>
        <Box sx={{ width: "100%" }}>
          <Box my={3}>
            {activeStep === 0 && <FormTrainingData />}
            {activeStep === 1 && <FormTrainingDetails />}
            {activeStep > 1 && <Typography sx={{ mt: 2, mb: 1 }}>TUDO OK</Typography>}
          </Box>
        </Box>
      </ModalDefault.Container>
      <ModalDefault.Footer>
        <FormButton 
          activeStep={activeStep} 
          handleBack={handleBack} 
          handleNext={handleNext} 
          submitForm={formik.submitForm}
          loading={loading} 
        />
      </ModalDefault.Footer>
    </ModalDefault.Root>
  );
};
