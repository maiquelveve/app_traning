import { createContext, useContext, useState, useEffect, useCallback } from "react";

import { useAuthUserContext } from "../AuthUserContext";

import { catchDefalutAlert } from "../../components";
import { apiService } from "../../services";

const TrainingPageContext = createContext({} as ITrainingPageContext);

export const useTrainingPageContext = () => {
  return useContext(TrainingPageContext);
};

export const TrainingPageProvider: React.FC<IAppProps> = ({ children }) => {
  const [loadingTrainings, setLoadingTrainings] = useState(true);
  const [loadingModalitiesTrainings, setLoadingModalitiesTrainings] = useState(true);
  const [trainingsListData, setTrainingsListData] = useState<ITrainingListData[]>([]);
  const [modalitiesTrainings, setModalitiesTrainings] = useState<IModality[]>([]);

  const { getToken } = useAuthUserContext();

  useEffect(() => {
    const fetch = async () => {
      await handleSearchTraining({ page: 1, perPage: 10 });
      await handleGetModalitiesTraining();
    };
    fetch();
  }, []);

  const handleGetModalitiesTraining = useCallback(async () => {
    try {
      setLoadingModalitiesTrainings(true);
      
      const responseApi = await apiService.get<IReturnedRequest>(
        "/modalitiesTraining", 
        { 
          headers: { Authorization: getToken() }
        }
      );      
      setModalitiesTrainings(responseApi.data.data[0].modalities); 

    } catch (error) {
      catchDefalutAlert();  
    } finally {
      setLoadingModalitiesTrainings(false);
    }
  }, []);

  const handleSearchTraining = useCallback(async ({ 
    modality_id, 
    searchTraining, 
    page=1, 
    perPage=10  
  }: ISearchTrainingFiltersProps) => {
    try {
      setLoadingTrainings(true);

      const responseApi = await apiService.get<IReturnedRequest>(
        "/trainings", 
        { 
          headers: { Authorization: getToken() },
          params: {
            page: page,
            perPage: perPage,
            trainingSearch: searchTraining,
            modality_id: modality_id
          }
        }
      ); 

      setTrainingsListData(responseApi.data.data[0].trainings);

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
