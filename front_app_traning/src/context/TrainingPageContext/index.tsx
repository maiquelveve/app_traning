import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { catchDefalutAlert } from "../../components";

const TrainingPageContext = createContext({} as ITrainingPageContext);

export const useTrainingPageContext = () => {
  return useContext(TrainingPageContext);
};

export const TrainingPageProvider: React.FC<IAppProps> = ({ children }) => {
  const [loadingTrainings, setLoadingTrainings] = useState(true);
  const [loadingModalitiesTrainings, setLoadingModalitiesTrainings] = useState(true);
  const [trainingsListData, setTrainingsListData] = useState<ITrainingListData[]>([]);
  const [modalitiesTrainings, setModalitiesTrainings] = useState<IModality[]>([]);

  useEffect(() => {
    const fetch = async () => {
      await handleSearchTraining({});
      await handleGetModalitiesTraining();
    };
    fetch();
  }, []);

  const handleGetModalitiesTraining = useCallback(async () => {
    try {
      setLoadingModalitiesTrainings(true);
      setModalitiesTrainings([
        { id: 1, modality: "MUSCULAÇÃO", modalityType: { id: 1, type: "TRAINING" } },
        { id: 2, modality: "CORRIDA", modalityType: { id: 1, type: "TRAINING" } },
      ]); 
      await handleSearchTraining({});

    } catch (error) {
      catchDefalutAlert();  
    } finally {
      setLoadingModalitiesTrainings(false);
    }
  }, []);

  const handleSearchTraining = useCallback(async ({ modality_id, searchTraining  }: ISearchTrainingFiltersProps) => {
    try {
      setLoadingTrainings(true);
      setTrainingsListData([
        { id: 1, traning: "SUPINO RETO", tag: "PEITORAL", modality: "MUSCULAÇÃO" },
        { id: 2, traning: "ROSCA DIRETA", tag: "BISCEPS", modality: "MUSCULAÇÃO" },
        { id: 3, traning: "CORRIDA 12 MINUTOS", tag: "RESISTENCIA", modality: "CORRIDA" },
        { id: 4, traning: "CORRE E PARA", tag: "GÁS", modality: "CORRIDA" },
      ]);
      console.log(modality_id, searchTraining);

    } catch (error) {
      catchDefalutAlert();  

    } finally {
      setLoadingTrainings(false);
    }
  }, []);

  return (
    <TrainingPageContext.Provider
      value={{
        handleSearchTraining,
        trainingsListData,
        loadingTrainings,
        loadingModalitiesTrainings,
        modalitiesTrainings,
      }}
    >
      {children}
    </TrainingPageContext.Provider>
  );
};
