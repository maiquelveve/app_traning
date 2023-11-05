import { useCallback, useMemo, useState, useEffect } from "react";
import { Box, Stepper, Step, StepLabel } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

import { useTrainingPageContext } from "../../../../../context";

import { ColorStepperConnector, ModalDefault, catchDefalutAlert, LoadingText } from "../../../../../components";
import { FormTrainingData, FormTrainingDetails, stepsTraining, StepIconTraining, FormButton, FormCheck } from "..";

export const ModalUpdate: React.FC<IModalProps & ITraningViewUpdateProps> = ({ handleClose, open, id }) => {
  const [trainingDetails, setTrainingDetails] = useState<ITrainingDetailsCreateProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(0);

  const { handleUpdadeTraining, loadingTrainings, handleGetTrainingById } = useTrainingPageContext();

  const formik = useFormik<FormikValuesTraining>({
    initialValues: {
      tag: "",
      training: "",
      modality_id: "",
      video_url: "",
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
    }),
    onSubmit: async (data) => {
      try {
        const success = await handleUpdadeTraining({ ...data, details: trainingDetails, id });
        if(success)
          handleCloseItModal();

      } catch (error) {
        catchDefalutAlert();
      } 
    }
  });

  useEffect(() => {
    const fetch = async () => {
      const training = await handleGetTrainingById({ id });

      if(training) {
        formik.setFieldValue("tag", training.tag);
        formik.setFieldValue("training", training.training);
        formik.setFieldValue("video_url", training.video_url);
        formik.setFieldValue("modality_id", training.modality.id);       
        setTrainingDetails(training.trainingDetails);
      }

      setLoading(false);
    };
    fetch();
  }, []);

  const handleCloseItModal = useCallback(() => {
    setTrainingDetails([]);
    formik.resetForm();
    handleReset();
    handleClose();
  }, []);

  const handleNext = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }, []);

  const handleNextDefinition = useCallback((index: number) => {
    setActiveStep(index);
  }, []);

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }, []);

  const handleReset = useCallback(() => {
    setActiveStep(0);
  }, []);

  const handleSaveDetails = useCallback((data: ITrainingDetailsCreateProps) => {
    setTrainingDetails((prevData) => [...prevData, data]);
  }, []);

  const handleDeleteDetail = useCallback(({ index }: { index: number }) => {
    setTrainingDetails((prevData) => prevData.filter((_, indexCurrent) => indexCurrent !== index ));
  }, []);

  const formDataValid = useMemo(() => !Object.keys(formik.errors).length, [formik.errors]);
  const isFormInInitialState = useMemo(() => (
    Object.keys(formik.values).every(
      key => formik.values[key as keyof FormikValuesTraining] === formik.initialValues[key as keyof FormikValuesTraining]
    )
  ), [formik.values]);
  
  return (
    <ModalDefault.Root handleClose={handleCloseItModal} open={open} maxWidth="lg">
      <ModalDefault.Header title="Editar Treino" handleClose={handleCloseItModal} />
      {loading ? 
        <Box display="flex" justifyContent="center" alignItems="center" height={250}>
          <LoadingText text="Buscando os dados do treino..." /> 
        </Box>
        :
        <>
          <Box mb={3}>
            <Stepper alternativeLabel activeStep={activeStep} connector={<ColorStepperConnector />} >
              {
                stepsTraining.map((label, index) => {
                  const stepProps: { completed?: boolean } = {};
                  return (
                    <Step key={label} {...stepProps} >
                      <StepLabel onClick={() => handleNextDefinition(index)} StepIconComponent={StepIconTraining}>{label}</StepLabel>
                    </Step>
                  );
                })
              }
            </Stepper>
          </Box>
          <ModalDefault.Container>
            <Box sx={{ width: "100%" }}>
              <Box my={3}>
                {activeStep === 0 && 
                <FormTrainingData 
                  formik={formik} 
                  loading={loadingTrainings} 
                />
                }
                {activeStep === 1 && 
                <FormTrainingDetails 
                  handleDeleteDetail={handleDeleteDetail} 
                  handleSaveDetails={handleSaveDetails} 
                  trainingDetails={trainingDetails} 
                />}
                {activeStep > 1 && 
                <FormCheck 
                  isFormInInitial={isFormInInitialState} 
                  isValid={formDataValid}
                  dataView={formik.values}
                  dataDetails={trainingDetails}
                  errors={formik.errors}
                />
                }
              </Box>
            </Box>
          </ModalDefault.Container>
        </>
      }
      <ModalDefault.Footer>
        <FormButton 
          isValid={!isFormInInitialState && formDataValid}
          loading={loadingTrainings} 
          activeStep={activeStep} 
          handleBack={handleBack} 
          handleNext={handleNext} 
          submitForm={formik.submitForm}
        />
      </ModalDefault.Footer>
    </ModalDefault.Root>
  );
};
