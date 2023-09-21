import { createContext, useContext, useRef, useCallback, useState, useEffect } from "react";

import { useAuthUserContext } from "..";
import { apiService } from "../../services";
import { catchDefalutAlert, defaultAlert } from "../../components";
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
  
  const [modalities, setModalities] = useState<IModality[]>([]);
  const { getToken } = useAuthUserContext();
  
  const filterSearch = useRef<string>(""); 
  const modalityTypeId = useRef<number | undefined>(undefined);
  
  const handleChangePageCurrent = useCallback(({ pageCurrent }: IPageCurrentProps) => setPageCurrent(pageCurrent), []);
  const handleSetTotalPage = useCallback((value: number) => setTotalPage(value), []);
  const handleChangeModalityTypeId = useCallback((value: number) => modalityTypeId.current = value, []);
  const handleChangeFilterSearch = useCallback((value: string) => filterSearch.current = value, []);
  const handleChangeLoadingModalities = useCallback((boolean: boolean) => setLoadingModalities(boolean), []);
  const handleSetModalities = useCallback((modalities: IModality[]) => setModalities(modalities), []);
 
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

    } catch (error) {
      catchDefalutAlert();  
    } finally {
      handleChangeLoadingModalities(false);
    }
  }, []);

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

  return (
    <ModalitiesPageContext.Provider value={{
      handleChangePageCurrent,
      handleChangePerPageCurrent,
      handleSetModalities,
      handleSetTotalPage,
      handleChangeFilterSearch,
      handleChangeModalityTypeId,
      handleChangeLoadingModalities,
      handleSearch: handleSearchGetFilters,
      handleModalityCreate,
      loadingModalities,
      filterSearch,
      modalityTypeId,
      modalities,
      pageCurrent,
      perPageCurrent,
      totalPage
    }}>
      {children}
    </ModalitiesPageContext.Provider>
  );
};
