import { createContext, useContext, useRef, useCallback, useState, useEffect } from "react";

import { useAuthUserContext } from "..";
import { apiService } from "../../services";
import { catchDefalutAlert, defaultAlert } from "../../components";
import { modalitiesTypesConversion } from "../../utils";
// import { LOCALSTORAGE_KEY_TOKEN } from "../../config";

const ModalitiesPageContext = createContext({} as IModalitiesPageContext);

export const useModalitiesPageContext = () => {
  return useContext(ModalitiesPageContext);
};

export const ModalitiesPageProvider: React.FC<IAppProps> = ({ children }) => {
  const [loadingModalities, setLoadingModalities] = useState(true);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [perPageCurrent, setPerPageCurrent] = useState(5);
  const [totalPage, setTotalPage] = useState(10);
  
  const [modalitiesTypes, setModalitiesTypes] = useState<IModalityType[]>([]);
  const [modalities, setModalities] = useState<IModality[]>([]);

  const { getToken } = useAuthUserContext();
  
  const filterSearch = useRef<string>(""); 
  const modalityTypeId = useRef<number | undefined>(undefined);
  
  const handleChangePageCurrent = useCallback(({ pageCurrent }: IPageCurrentProps) => setPageCurrent(pageCurrent), []);
  const handleChangeLoadingModalities = useCallback((boolean: boolean) => setLoadingModalities(boolean), []);
  const handleSetModalities = useCallback((modalities: IModality[]) => setModalities(modalities), []);
  
  const handleVerifyModalityType = useCallback((props: IVerifyModalityTypeProps) => {
    const { modalitiesTypes, modality_type_text } = props;
    const modality_type_id = modalitiesTypes.find(modalityType => modalityType.type === modality_type_text)?.id;
    
    return { modality_type_id: modality_type_id ? modality_type_id : undefined };
  }, []);
 
  const handleModalityCreate = useCallback(async (data: IModalityCreateProps) => {
    try {
      handleChangeLoadingModalities(true);
      
      const responseApi = await apiService.post<IReturnedRequest>("/modalities", data, { headers: { Authorization: getToken() }});
      
      if(responseApi.data.isSuccess) {
        defaultAlert({ 
          messages: ["Modalidade cadastrada com sucesso!"],
          type: "success",
          position: "top-right"
        });
        await handleSearch({ 
          filter: filterSearch.current, 
          modality_type_id: modalityTypeId.current, 
          pageCurrent, 
          perPageCurrent 
        });
      } else {
        defaultAlert({ 
          messages: responseApi.data.errors,
          type: "error",
          position: "top-right"
        });
      }

      handleChangeLoadingModalities(false);
      return responseApi.data.isSuccess;

    } catch (error) {
      catchDefalutAlert();  
    } 
  }, [pageCurrent, perPageCurrent]);

  const handleModalityUpdate = useCallback(async (data: IModalityUpdateProps) => {
    try {
      handleChangeLoadingModalities(true);
      
      const responseApi = await apiService.put<IReturnedRequest>(
        `/modalities/${data.id}`, 
        data, 
        { headers: { Authorization: getToken() }}
      );
      
      if(responseApi.data.isSuccess) {
        defaultAlert({ 
          messages: ["Modalidade alterada com sucesso!"],
          type: "success",
          position: "top-right"
        });
        await handleSearch({ 
          filter: filterSearch.current, 
          modality_type_id: modalityTypeId.current, 
          pageCurrent, 
          perPageCurrent 
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
      handleChangeLoadingModalities(false);
    }
  }, [pageCurrent, perPageCurrent]);

  const handleChangePerPageCurrent = useCallback(({ perPageCurrent }: IPerPageCurrentProps) => {
    setPageCurrent(1);
    setPerPageCurrent(perPageCurrent);
  }, []);
 
  const handleSearchGetFilters = useCallback(async ({ filter, modality_type_id }: THandleSerchToolbarDefaultProps) => {
    await handleSearch({ filter, modality_type_id, pageCurrent, perPageCurrent });
  }, []);
  
  const handleSearch = useCallback(async ({ 
    filter, 
    modality_type_id, 
    pageCurrent, 
    perPageCurrent 
  }: THandleSerchToolbarDefaultContextProps): Promise<void> => { 

    handleChangeLoadingModalities(true);
    filterSearch.current = filter;
    modalityTypeId.current = modality_type_id;

    try {
      const responseApi = await apiService.get<IReturnedRequest>("/modalities", { 
        /***** 
          AQUI oocrreu um bug em DEV ao salvar o arquivo dizendo que getToken é undefined, acredito que seja o VITE que so atualizar o que mudou perdendo o contextUserAuthn sendo necessário dar F5, atualizado toda a aplicação, mas se colocar "localStorage.getItem(LOCALSTORAGE_KEY_TOKEN)" direto não ocorre mais o bug em DEV. 
        *****/ 
        headers: { Authorization: getToken() }, 
        params: {
          page: pageCurrent,
          perPage: perPageCurrent,
          modalitySearch: filterSearch.current,
          modality_type_id: modalityTypeId.current
        }
      });

      setModalities(responseApi.data.data[0].modalities);
      setTotalPage(responseApi.data.data[0].totalPages);

    } catch (error) {
      catchDefalutAlert();  
    } finally {
      handleChangeLoadingModalities(false);
    }
  }, []); 

  useEffect(() => { 
    async function fetch() {
      await handleSearch({ 
        filter: filterSearch.current, 
        modality_type_id: modalityTypeId.current,
        pageCurrent,
        perPageCurrent 
      });
    }
    fetch();
  },[pageCurrent, perPageCurrent]);

  useEffect(() => {
    try {
      handleChangeLoadingModalities(true);
      const fetch = async () => {
        const response = await apiService.get<IReturnedRequest>("/modalitiesTypes");
        const data = response.data.data[0].modalitiesTypes.map((modality:  IModalityType): IModalityType => {
          return {
            type: modalitiesTypesConversion(modality.type),
            id: modality.id
          };
        }); 
        setModalitiesTypes(data);
      };
      fetch();

    } catch (error) {
      catchDefalutAlert();

    } finally {
      handleChangeLoadingModalities(false);
    }
  }, []);

  return (
    <ModalitiesPageContext.Provider value={{
      handleChangePageCurrent,
      handleChangePerPageCurrent,
      handleSetModalities,
      handleChangeLoadingModalities,
      handleSearch: handleSearchGetFilters,
      handleModalityCreate,
      handleModalityUpdate,
      handleVerifyModalityType,
      loadingModalities,
      filterSearch,
      modalityTypeId,
      modalities,
      pageCurrent,
      perPageCurrent,
      totalPage,
      modalitiesTypes
    }}>
      {children}
    </ModalitiesPageContext.Provider>
  );
};
