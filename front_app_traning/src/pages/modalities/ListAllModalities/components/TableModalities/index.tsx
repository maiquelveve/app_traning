import { useCallback, useEffect, useState } from "react";
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

export const TableModalities: React.FC = () => {
  const [selected, setSelected] = useState<IModality | null>(null);
  const [pageCurrent, setpageCurrent] = useState(1);
  const [perPageCurrent, setPerPageCurrent] = useState(5);
  const [totalPage, setTotalPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [modalities, setModalities] = useState<IModality[]>([]);

  const { themeCurrent } = useLayoutContext();
  const { getToken } = useAuthUserContext();

  useEffect(() => {
    async function fetch() {
      const responseApi = await apiService.get<IReturnedRequest>("/modalities", { 
        headers: { Authorization: getToken() }, 
        params: {
          page: pageCurrent,
          perPage: perPageCurrent
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

  const handleSerch = useCallback(({ filter, modality_type_id }: THandleSerchToolbarDefaultProps): IModality[] => { 
    console.log(filter); 
    console.log(modality_type_id); 
    return [];
  }, []);

  return (
    <Box sx={{ width: "100%" }} component={Paper} elevation={24} borderRadius={5}>
      {loading ? 
        <Box display="flex" justifyContent="center" alignItems="center" height={350}>
          <LoadingText text="Aguarde! Carregando as modalidades..." size={50} /> 
        </Box>
        : 
        <Box component={Stack} spacing={5}>
          <TableToolbar 
            selectedData={selected}  
            handleDeactivate={handleDeactivate} 
            handleEdit={handleEdit}
            handleSerch={handleSerch}
          />
          <Box>
            {!modalities.length ? <TableEmpty /> :
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
                        <TableCell align="center">{modality.type}</TableCell>
                      </TableRow> 
                    ))}
                  </TableBody>          
                </Table>
              </TableContainer>
            }
            <TableFooter 
              handleChangePageCurrent={handleChangePageCurrent}
              handleChangePerPageCurrent={handleChangePerPageCurrent}
              totalPageCont={totalPage}
              perPageCurrent={perPageCurrent}
              pageCurrent={pageCurrent}
            />
          </Box>
        </Box>
      }
    </Box>
  );
};
