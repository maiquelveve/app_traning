import { FormDataEmpty, FormDataErrors, FormView } from ".";

export const FormCheck: React.FC<IFormCheckProps> = ({ isFormInInitial, isValid, dataView, errors, dataDetails }) => {
  return(
    <>
      {isFormInInitial ? <FormDataEmpty /> : 
        !isValid ?
          <FormDataErrors errors={errors} />
          :
          <FormView data={dataView} dataDetails={dataDetails} />
      }
    </>
  );
};
