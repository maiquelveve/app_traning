export const verifyTrainingDetail = async (
  { details }: IVerifyTrainingDetailsProps
): Promise<ICustomValidationSystemReturnDetailsTraining> => {
  
  if(details.length > 5) {
    return { error: true, message: ["Informe no máximo 5 detalhes por treino."] };
  }
  
  let returns: ICustomValidationSystemReturnDetailsTraining = { error: false, message: []};
  details.map((detail, indexDetail) => {
    const verifyReptedDetail = details.find(
      (repeatedDetail, indexRepeated) => (repeatedDetail.description === detail.description && indexRepeated !== indexDetail)
    );

    if(verifyReptedDetail) {
      returns = { error: true, message: ["Detalhes dos treinos repitidos. Analise os dados informados."] };
    }
  });

  if(returns.error) return returns;

  details.map((detail) => {
    if(detail.description.length < 5) {
      returns = { 
        error: true, 
        message: [
          ...returns.message, 
          `A Descrição do detalhe '${detail.description}' deve conter 5 caracteres no mínimo.`
        ] 
      };
    }

    if(detail.description.length > 50) {
      returns = { 
        error: true, 
        message: [
          ...returns.message, 
          `A Descrição do detalhe '${detail.description}' deve conter 50 caracteres no máximo.`
        ] 
      };
    }

    if(detail.value.length < 1) {
      returns = { 
        error: true, 
        message: [
          ...returns.message, 
          `O Valor do detalhe '${detail.value}' deve conter 1 caracteres no mínimo.`
        ] 
      };
    }

    if(detail.value.length > 25) {
      returns = { 
        error: true, 
        message: [
          ...returns.message, 
          `O Valor do detalhe '${detail.value}' deve conter 25 caracteres no máximo.`
        ] 
      };
    }
  });

  return returns;
};
