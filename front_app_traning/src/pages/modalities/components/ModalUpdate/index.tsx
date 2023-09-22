import { useCallback, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { ModalDefault, catchDefalutAlert, defaultAlert } from "../../../../components";
import { useModalitiesPageContext } from "../../../../context/ModalitiesPageContext";
import { modalitiesTypesConversion } from "../../../../utils";
import { apiService } from "../../../../services";

import { FormModalities, ButtonSaveModalities } from "../FormModalities";

export const ModalUpdate: React.FC<IModalModality & IUpdateModalModalityProps> = ({ handleClose, open, selectedModality }) => {
  const [modalitiesTypes, setModalitiesTypes] = useState<IModalityType[]>([]);
  const [loading, setLoading] = useState(true);

  const { handleModalityCreate } = useModalitiesPageContext();
  
  const handleCloseItModal = useCallback(() => {
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
        const modality_type_id = modalitiesTypes.find(modalityType => modalityType.type === modality_type)?.id;
        if(!modality_type_id) {
          defaultAlert({ messages: ["Tipo de Modalidade invalido."], type: "error", position: "top" });
        } else {
          const success = await handleModalityCreate({ modality, modality_type_id });
          
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
