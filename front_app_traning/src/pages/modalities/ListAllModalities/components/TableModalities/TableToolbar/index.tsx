import { useCallback } from "react";
import { Toolbar } from "@mui/material";

import { SelectedToobar } from "./SelectedToobar";
import { DeafaultToolbar } from "./DefaultToobar";

export const TableToolbar: React.FC<ITableToolbarProps> = ({ selectedData }) => {

  const handleEdit = useCallback(({ id }: THandleToolbarSelectedIdtProps): void => { 
    console.log(id); 
  }, []);

  const handleDeactivate = useCallback(({ id }: THandleToolbarSelectedIdtProps): void => { 
    console.log(id); 
  }, []);

  const handleSerch = useCallback(({ filter, modality_type_id }: THandleSerchToolbarDefaultProps): IModality[] => { 
    console.log(filter); 
    console.log(modality_type_id); 
    return [];
  }, []);

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(selectedData !== "" && {
          bgcolor: (theme) => theme.palette.primary.main,
        }),
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        mb: 1,
      }}
    >
      {selectedData !== "" ? (
        <SelectedToobar 
          selectedData={selectedData} 
          handleDeactivate={handleDeactivate} 
          handleEdit={handleEdit} 
        />
      ) : (
        <DeafaultToolbar handleSerch={handleSerch} />
      )}
    </Toolbar>
  );
};
