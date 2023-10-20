import { useCallback, useState } from "react";
import { Box, Zoom } from "@mui/material";

import { CardComponent, Page } from "../../../components";

import { Selector } from "../Selector";
import { Training } from "../Training";
import { Class } from "../Class";

export const RootTraining: React.FC = () => {
  
  const [showSelector, setShowSelector] = useState(true); 
  const [showTraining, setShowTraining] = useState(false); 
  const [showClass, setShowClass] = useState(false); 

  const handleClickTraining = useCallback(() => {
    setShowTraining(true); 
    setShowClass(false);
    setShowSelector(false);
  }, []);

  const handleClickClass = useCallback(() => {
    setShowClass(true);
    setShowTraining(false); 
    setShowSelector(false);
  }, []);

  const handleGoBack = useCallback(() => {
    setShowSelector(true);
    setShowClass(false);
    setShowTraining(false); 
  }, []);

  return(
    <Page title={showTraining ? "Treinos" : showClass ? "Aulas" : "Treinamentos"}>
      <CardComponent>
        {showSelector && 
          <Zoom in={showSelector} timeout={{ enter: 1000, exit: 3000  }} >
            <Box>
              <Selector handleClickClass={handleClickClass} handleClickTraining={handleClickTraining} />
            </Box>
          </Zoom>
        }
        {showTraining && 
          <Zoom in={showTraining} timeout={{ enter: 1000, exit: 3000 }} >
            <Box>
              <Training handleGoBack={handleGoBack} />
            </Box>
          </Zoom>
        }
        {showClass && 
          <Zoom in={showClass} timeout={{ enter: 1000, exit: 3000  }} >
            <Box>
              <Class handleGoBack={handleGoBack} />
            </Box>
          </Zoom>
        }
      </CardComponent>   
    </Page>
  );
};
