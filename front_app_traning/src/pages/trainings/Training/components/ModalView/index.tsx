import { useCallback, useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

import { FormView } from "..";
import { LoadingSimple, ModalDefault } from "../../../../../components";
import { useTrainingPageContext } from "../../../../../context";

export const ModalView: React.FC<IModalProps & ITraningViewUpdateProps> = ({ handleClose, open, id }) => {
  const [trainingDetails, setTrainingDetails] = useState<ITrainingDetailsCreateProps[]>([]);
  const [loading, setLoading] = useState(true);

  const { handleGetTrainingById } = useTrainingPageContext();

  const formik = useFormik<FormikValuesTraining>({
    initialValues: {
      tag: "",
      training: "",
      modality_id: "",
      video_url: "",
      submit: null
    },
    validationSchema: yup.object({}),
    onSubmit: () => {}
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
    formik.resetForm();
    handleClose();
  }, []);
  
  return (
    <ModalDefault.Root handleClose={handleCloseItModal} open={open} maxWidth="lg">
      <ModalDefault.Header title="Treinos" handleClose={handleCloseItModal} />
      <ModalDefault.Container>
        <Box sx={{ width: "100%" }}>
          <Box my={3}>
            <FormView data={formik.values} dataDetails={trainingDetails} />
          </Box>
        </Box>
      </ModalDefault.Container>
      <ModalDefault.Footer>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          {loading ? 
            <Box mx={3}>
              <LoadingSimple size={30} /> 
            </Box>  
            :
            <Button
              color="inherit"
              sx={{ mr: 1 }}
              onClick={handleCloseItModal}
            >
              FECHAR
            </Button>
          }  
        </Box> 
      </ModalDefault.Footer>
    </ModalDefault.Root>
  );
};
