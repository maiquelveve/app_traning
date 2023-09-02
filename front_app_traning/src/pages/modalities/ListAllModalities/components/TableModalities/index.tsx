import { useCallback, useEffect, useState, useRef } from "react";
import { 
  Table, 
  TableBody,
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Checkbox, 
  Box,
  Stack,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { green } from "@mui/material/colors";

import { apiService } from "../../../../../services";

import { useLayoutContext, useAuthUserContext } from "../../../../../context";
import { LoadingText, catchDefalutAlert } from "../../../../../components";

import { TableToolbar } from "./TableToolbar";
import { TableFooter } from "./TableFooter";
import { TableEmpty } from "./TableEmpty";
import { modalitiesTypesConversion } from "../../../../../utils";

export const TableModalities: React.FC = () => {
  const [pageCurrent, setpageCurrent] = useState(1);
  const [perPageCurrent, setPerPageCurrent] = useState(5);
  const [totalPage, setTotalPage] = useState(10);
  
  const [selected, setSelected] = useState<IModality | null>(null);
  const [modalities, setModalities] = useState<IModality[]>([]);
  const [loading, setLoading] = useState(true);

  const { themeCurrent } = useLayoutContext();
  const { getToken } = useAuthUserContext();

  const filterSearch = useRef<string | undefined>(undefined);
  const modalityTypeId = useRef<number | undefined>(undefined);

  useEffect(() => {
    async function fetch() {
      const responseApi = await apiService.get<IReturnedRequest>("/modalities", { 
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
    }

    try {
      fetch();
    } catch (error) {
      catchDefalutAlert();  
    } finally {
      setLoading(false);
    }
  }, [pageCurrent, perPageCurrent]);


  const handleChangePageCurrent = useCallback(({ pageCurrent }: IPageCurrent) => {
    setpageCurrent(pageCurrent);
  }, []);

  const handleChangePerPageCurrent = useCallback(({ perPageCurrent }: IPerPageCurrent) => {
    setpageCurrent(1);
    setPerPageCurrent(perPageCurrent);
  }, []);


  const handleEdit = useCallback(({ modalityCurrent }: THandleToolbarSelectedProps): void => { 
    console.log(modalityCurrent); 
  }, []);

  const handleDeactivate = useCallback(({ modalityCurrent }: THandleToolbarSelectedProps): void => { 
    console.log(modalityCurrent); 
  }, []);

  const handleSearch = useCallback(async ({ filter, modality_type_id }: THandleSerchToolbarDefaultProps): Promise<void> => { 
    setLoading(true);
    filterSearch.current = filter;
    modalityTypeId.current = modality_type_id;

    try {
      const responseApi = await apiService.get<IReturnedRequest>("/modalities", { 
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
      setLoading(false);
    }
  }, []);

  return (
    <Box sx={{ width: "100%" }} component={Paper} elevation={24} borderRadius={5}>
      <Box component={Stack} spacing={5}>
        <TableToolbar 
          selectedData={selected}  
          handleDeactivate={handleDeactivate} 
          handleEdit={handleEdit}
          handleSearch={handleSearch}
        />
        {loading ? 
          <Box display="flex" justifyContent="center" alignItems="center" height={350}>
            <LoadingText text="Aguarde! Carregando as modalidades..." size={50} /> 
          </Box>
          : 
          <Box>
            {!modalities.length ? <TableEmpty /> :
              <>
                <TableContainer sx={{ mb: 1 }}>
                  <Table sx={{ minWidth: 350 }} aria-labelledby="tableModalities">
                    <TableHead>
                      <TableRow>
                        <TableCell padding="checkbox"></TableCell>
                        <TableCell
                          align={"left"}
                          padding={"normal"}
                        >
                          MODALIDADE
                        </TableCell>
                        <TableCell
                          align={"center"}
                          padding={"normal"}
                        >
                          TIPO
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {modalities.map((modality) => (
                        <TableRow
                          hover
                          onClick={() => modality.modality !== selected?.modality ? setSelected(modality) : setSelected(null)}
                          key={modality.modality}
                          selected={selected?.modality === modality.modality  ? true : false}
                          sx={{ cursor: "pointer" }}
                          style={{
                            backgroundColor: (themeCurrent === "dark")  ? 
                              selected?.modality === modality.modality ? green[400] : "inherit"
                              : 
                              selected?.modality === modality.modality ? alpha("#078D03", 0.12) : "inherit"
                          }}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox color="primary" checked={selected?.modality === modality.modality ? true : false} />
                          </TableCell>
                          <TableCell align="left">{modality.modality}</TableCell>
                          <TableCell align="center">{modalitiesTypesConversion(modality.modalityType.type)}</TableCell>
                        </TableRow> 
                      ))}
                    </TableBody>          
                  </Table>
                </TableContainer>
                <TableFooter 
                  handleChangePageCurrent={handleChangePageCurrent}
                  handleChangePerPageCurrent={handleChangePerPageCurrent}
                  totalPageCont={totalPage}
                  perPageCurrent={perPageCurrent}
                  pageCurrent={pageCurrent}
                />
              </>
            }
          </Box>
        }
      </Box>
    </Box>
  );
};
