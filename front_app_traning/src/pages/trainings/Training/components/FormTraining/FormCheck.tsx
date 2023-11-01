import { FormDataEmpty, FormDataErrors, FormView } from ".";

export const FormCheck: React.FC<IFormCheckProps> = ({ isFormInInitial, isValid, dataView, errors }) => {
  return(
    <>
      {isFormInInitial ? <FormDataEmpty /> : 
        !isValid ?
          <FormDataErrors errors={errors} />
          :
          <FormView data={dataView} />
      }
    </>
  );
};
