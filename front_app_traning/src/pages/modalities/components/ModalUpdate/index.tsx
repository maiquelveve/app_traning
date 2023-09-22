import { useCallback, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { ModalDefault, defaultAlert } from "../../../../components";
import { useModalitiesPageContext } from "../../../../context/ModalitiesPageContext";
import { modalitiesTypesConversion } from "../../../../utils";

import { FormModalities, ButtonSaveModalities } from "../FormModalities";

export const ModalUpdate: React.FC<IModalModality & IUpdateModalModalityProps> = ({ handleClose, open, selectedModality }) => {
  const [loading, setLoading] = useState(false);

  const { handleModalityUpdate, modalitiesTypes, handleVerifyModalityType } = useModalitiesPageContext();
  
  const handleCloseItModal = useCallback(() => {
    handleClose();
  }, []);

  const formik = useFormik({
    initialValues: {
      modality: selectedModality.modality,
      modality_type: modalitiesTypesConversion(selectedModality.modalityType.type),
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
        const { modality_type_id } = handleVerifyModalityType({ modalitiesTypes, modality_type_text: modality_type });
        if(!modality_type_id) {
          defaultAlert({ messages: ["Tipo de Modalidade invalido."], type: "error", position: "top" });
        } else {
          const id = selectedModality.id!;
          const success = await handleModalityUpdate({ id, modality, modality_type_id });
          
          if(success)
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
        <FormModalities
          formik={formik}
          loading={loading}
          modalitiesTypes={modalitiesTypes}
        /> 
      </ModalDefault.Container>
      <ModalDefault.Footer>
        <ButtonSaveModalities 
          loading={loading}
          submitForm={formik.submitForm}
        />
      </ModalDefault.Footer>
    </ModalDefault.Root>
  );
};
