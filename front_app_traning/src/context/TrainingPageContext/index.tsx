import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

import { useAuthUserContext } from "../AuthUserContext";

import { catchDefalutAlert, defaultAlert } from "../../components";
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
  const [perPageCurrent, setPerPageCurrent] = useState(5);

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
      await handleSearchTraining({ 
        modality_id: modalityIdRef.current,
        searchTraining: searchTrainingRef.current,
        page: pageCurrent,
        perPage: perPageCurrent
      });
    }
    fetch();
  },[pageCurrent, perPageCurrent]);

  const handleChangePageCurrent = useCallback(({ pageCurrent }: IPageCurrentProps) =>  setPageCurrent(pageCurrent), []); 
  const handleChangePerPageCurrent = useCallback(({ perPageCurrent }: IPerPageCurrentProps) =>  {
    setPageCurrent(1);
    setPerPageCurrent(perPageCurrent);
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

  const handleSearchFilterTraining = useCallback(async ({ modality_id, searchTraining }: ISearchTrainingFiltersProps) => {
    await handleSearchTraining({ page: pageCurrent, perPage: perPageCurrent, modality_id, searchTraining });
  }, []);
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

  const handleCreateTraining = useCallback(async ({ 
    details, 
    modality_id, 
    tag, 
    training, 
    video_url 
  }: ICreateTrainingProps): Promise<boolean | undefined> => {
    try {
      setLoadingTrainings(true);

      const responseApi = await apiService.post<IReturnedRequest>(
        "/trainings", 
        { training, tag, video_url, modality_id, details }, 
        { headers: { Authorization: getToken() }}
      );

      if(responseApi.data.isSuccess) {
        defaultAlert({ 
          messages: ["Modalidade cadastrada com sucesso!"],
          type: "success",
          position: "top-right"
        });
        await handleSearchTraining({ 
          modality_id: modalityIdRef.current,
          searchTraining: searchTrainingRef.current,
          page: pageCurrent,
          perPage: perPageCurrent
        });

      } else {
        defaultAlert({ 
          messages: responseApi.data.errors,
          type: "error",
          position: "top-right"
        });
      }

      return responseApi.data.isSuccess;

    } catch (error) {
      catchDefalutAlert();  
    } finally {
      setLoadingTrainings(false);
    }
  }, []);

  const handleUpdadeTraining = useCallback(async ({ 
    id,
    details, 
    modality_id, 
    tag, 
    training, 
    video_url
  }: ICreateTrainingProps & ITraningViewUpdateProps): Promise<boolean | undefined> => {
    try {
      setLoadingTrainings(true);

      const responseApi = await apiService.put<IReturnedRequest>(
        `/trainings/${id}`, 
        { training, tag, video_url, modality_id, details }, 
        { headers: { Authorization: getToken() }}
      );

      if(responseApi.data.isSuccess) {
        defaultAlert({ 
          messages: ["Modalidade alterada com sucesso!"],
          type: "success",
          position: "top-right"
        });
        await handleSearchTraining({ 
          modality_id: modalityIdRef.current,
          searchTraining: searchTrainingRef.current,
          page: pageCurrent,
          perPage: perPageCurrent
        });

      } else {
        defaultAlert({ 
          messages: responseApi.data.errors,
          type: "error",
          position: "top-right"
        });
      }

      return responseApi.data.isSuccess;

    } catch (error) {
      catchDefalutAlert();  
    } finally {
      setLoadingTrainings(false);
    }
  }, []);

  const handleGetTrainingById = useCallback(async ({ id }: ITraningViewUpdateProps): Promise<ITraining | null | undefined> => {
    try {
      const responseApi = await apiService.get<IReturnedRequest>(`/trainings/${id}`, { headers: { Authorization: getToken() }});

      if(responseApi.data.isError) {
        defaultAlert({ 
          messages: responseApi.data.errors,
          type: "error",
          position: "top-right"
        });
        return;
      }  
      
      return responseApi.data.data[0];

    } catch (error) {
      catchDefalutAlert();  
    }
  }, []);

  return (
    <TrainingPageContext.Provider
      value={{
        handleSearchFilterTraining,
        handleChangePageCurrent,
        handleChangePerPageCurrent,
        handleCreateTraining,
        handleUpdadeTraining,
        handleGetTrainingById,
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
