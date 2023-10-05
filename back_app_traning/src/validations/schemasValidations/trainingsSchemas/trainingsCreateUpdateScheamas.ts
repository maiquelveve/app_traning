import * as yup from "yup";
import { serializeData } from "../../../helpers";

export const trainingsCreateUpdateScheamas: yup.ObjectSchema<ITrainingCreateUpdate> = yup.object().shape({
  id: yup
    .number().typeError("ID invalido."),
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
          .min(5, ({ value }) => `A Descrição do detalhe '${serializeData(value)}' deve conter 5 caracteres no mínimo.`)
          .max(50, ({ value }) => `A Descrição do detalhe '${serializeData(value)}' deve conter 50 caracteres no máximo.`)
          .required(({ path }) => 
            `${+(path.split("[")[1].split("]"))[0] + 1}º Descrição é obrigatória para os detalhes, reveja os dados informados.`
          ),
        value: yup
          .string()
          .min(1, ({ value }) => `O Valor do detalhe '${serializeData(value)}' deve conter 1 caracteres no mínimo.`)
          .max(25, ({ value }) => `O Valor do detalhe '${serializeData(value)}' deve conter 25 caracteres no máximo.`)
          .required(({ path }) => 
            `${+(path.split("[")[1].split("]"))[0] + 1}º Valor é obrigatório para os detalhes, reveja os dados informados.`
          ),
      })
    )
    .required("Detalhes do Treino são obrigatórios."),
});
