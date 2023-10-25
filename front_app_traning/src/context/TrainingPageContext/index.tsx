import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

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
  const [pageCurrent, setPageCurrent] = useState(1);
  const [perPageCurrent, setPerPageCurrent] = useState(1);

  const { getToken } = useAuthUserContext();

  const searchTrainingRef = useRef<string | undefined>(undefined); 
  const modalityIdRef = useRef<number | undefined>(undefined);
  const totalPageRef = useRef<number>(0);

  useEffect(() => {
    const fetch = async () => {
      await handleSearchFilterTraining({});
      await handleGetModalitiesTraining();
    };
    fetch();
  }, []);

  useEffect(() => { 
    async function fetch() {
      await handleSearchFilterTraining({ 
        modality_id: modalityIdRef.current,
        searchTraining: searchTrainingRef.current
      });
    }
    fetch();
  },[pageCurrent, perPageCurrent]);

  const handleChangePageCurrent = ({ pageCurrent }: IPageCurrentProps) =>  setPageCurrent(pageCurrent) ; 
  const handleChangePerPageCurrent = ({ perPageCurrent }: IPerPageCurrentProps) =>  {
    setPageCurrent(1);
    setPerPageCurrent(perPageCurrent);
  };

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

  const handleSearchFilterTraining = useCallback(async ({ modality_id, searchTraining }: ISearchTrainingFiltersProps) => {
    await handleSearchTraining({ page: pageCurrent, perPage: perPageCurrent, modality_id, searchTraining });
  }, [perPageCurrent, pageCurrent]);
  const handleSearchTraining = useCallback(async ({ 
    modality_id, 
    searchTraining, 
    page=1, 
    perPage=10  
  }: ISearchTrainingProps) => {
    try {
      setLoadingTrainings(true);
      searchTrainingRef.current = searchTraining;
      modalityIdRef.current = modality_id;

      const responseApi = await apiService.get<IReturnedRequest>(
        "/trainings", 
        { 
          headers: { Authorization: getToken() },
          params: {
            page: page,
            perPage: perPage,
            trainingSearch: searchTrainingRef.current,
            modality_id: modalityIdRef.current
          }
        }
      ); 

      totalPageRef.current = responseApi.data.data[0].totalPages;
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
        handleSearchFilterTraining,
        handleChangePageCurrent,
        handleChangePerPageCurrent,
        trainingsListData,
        loadingTrainings,
        loadingModalitiesTrainings,
        modalitiesTrainings,
        pageCurrent,
        perPageCurrent,
        totalPage: totalPageRef.current
      }}
    >
      {children}
    </TrainingPageContext.Provider>
  );
};
