import { useCallback, useState } from "react";
import { Box, CardContent, Typography, useMediaQuery, useTheme } from "@mui/material";

import { CardComponent, Page } from "../../../components";
import { CardTraining } from "./components";

import trainingCardImg from "../../../assets/trainig-card.png";
import classCardImg from "../../../assets/class-card.png";

export const RootTraining: React.FC = () => {
  const [isClickedTraining, setIsClickedTraining] = useState(false);
  const [isClickedClass, setIsClickedClass] = useState(false);
  
  // const [showRoot, setShowRoot] = useState(true); 
  // const [showTraining, setShowTraining] = useState(false); 
  // const [showClass, setShowClass] = useState(false); 

  const theme = useTheme();
  const lgDown = useMediaQuery(theme.breakpoints.down("lg"));
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickTraining = useCallback(() => {
    setIsClickedTraining(true); 
    setIsClickedClass(false);
  }, []);

  const handleClickClass = useCallback(() => {
    setIsClickedTraining(false); 
    setIsClickedClass(true);
  }, []);

  return(
    <Page title={isClickedTraining ? "Treinos" : isClickedClass ? "Aulas" : "Treinamentos"}>
      <CardComponent>
        <CardContent>
          <Box display="flex" justifyContent="center" alignItems="center" mb={5} mt={3}>
            <Typography
              variant="overline"
              fontSize={smDown ? 16 : 19}
            >
              Selecione o Estilo de Treinamento
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-evenly" alignItems="center" flexDirection={lgDown ? "column" : "row"} mb={8}>
            <Box mb={lgDown ? 5 : 0}>
              <CardTraining
                title="treinos"
                subTitle="veja os treinos"
                desc="Acesse para ver os treino cadastrados ou crie e edite novos treinos" 
                img={trainingCardImg}
                handleClick={handleClickTraining}
              />
            </Box>
            <Box>
              <CardTraining
                title="aulas"
                subTitle="veja as aulas"
                desc="Acesse para ver as aulas cadastradas ou crie e edite novas aulas" 
                img={classCardImg}
                handleClick={handleClickClass}
              />
            </Box>
          </Box>
        </CardContent>
      </CardComponent>   
    </Page>
  );
};
