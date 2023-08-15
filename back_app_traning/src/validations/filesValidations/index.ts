import filesize from "filesize";
import { LIMIT_FILE_SIZE } from "../../config";

export const filesValidations = ({ file, allowMimes, limit=LIMIT_FILE_SIZE }: IFilesValidationsProps) => {
    
  if(!file) return {isError: true, isSuccess: false, errors: ["Selecione um arquivo."] };
  
  if(file.size > limit) {
    return {
      isError: true, 
      isSuccess: false, 
      errors: [`O tamanho do arquivo deve ser no máximo de ${filesize.filesize(limit, { precision: 1 })}.`] 
    };
  }

  if(!allowMimes.includes(file.mimetype)) {
    return {isError: true, isSuccess: false, errors: ["Arquivo invalido, escolha arquivo do tipo JPGE, JPG, PNG"] };
  } 

  return {isError: false, isSuccess: true, errors: [] };
};
