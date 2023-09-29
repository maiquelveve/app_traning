export const verifyTrainingDetail = async ({ details }: IVerifyTrainingDetailsProps): Promise<IValidationSystemReturn> => {
  
  if(details.length > 5) {
    return { error: true, message: "Informe no máximo 5 detalhes por treino." };
  }
  
  let returns: IValidationSystemReturn = { error: false, message: "" };
  details.map((detail, indexDetail) => {
    const verifyReptedDetail = details.find(
      (repeatedDetail, indexRepeated) => (repeatedDetail.description === detail.description && indexRepeated !== indexDetail)
    );

    if(verifyReptedDetail) {
      returns = { error: true, message: "Detalhes dos treinos repitidos. Analise os dados informados." };
    }
  });

  return returns;
};
