import { Button } from "@mui/material";
import { LoadingSimple } from "../../../../components";

export const ButtonSaveModalities: React.FC<IButtonSaveModalities> = ({ loading, submitForm }) => { 
  return(
    <>
      {loading ? <LoadingSimple size={34} /> :
        <Button 
          autoFocus 
          variant="contained"
          type="submit"
          disabled={loading}
          onClick={submitForm}
        >
          SALVAR
        </Button>
      } 
    </>
  );
};
