import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Dashoard: React.FC = () => {

  const navigate = useNavigate();

  return(
    <Stack spacing={2}>
      <Button variant="contained" onClick={() => navigate("/root")} >ROOT</Button>
      <Button variant="contained" onClick={() => navigate("/trainer")} >TRAINER</Button>
      <Button variant="contained" onClick={() => navigate("/user")} >USER</Button>
      <Button variant="contained" onClick={() => navigate("/acessos")} >ACESSOS</Button>
    </Stack>
  );
};
