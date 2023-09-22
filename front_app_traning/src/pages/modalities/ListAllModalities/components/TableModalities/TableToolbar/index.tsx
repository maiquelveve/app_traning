import { Toolbar } from "@mui/material";

import { SelectedToobar } from "./SelectedToobar";
import { DeafaultToolbar } from "./DefaultToobar";

export const TableToolbar: React.FC<ITableToolbarSelectedProps> = ({ selectedData, disableSelectedData }) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...((selectedData?.modality !== "" && selectedData) && {
          bgcolor: (theme) => theme.palette.primary.main,
        }),
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        mb: 1,
      }}
    >
      {(selectedData?.modality !== "" && selectedData) ? (
        <SelectedToobar selectedData={selectedData} disableSelectedData={disableSelectedData} />
      ) : (
        <DeafaultToolbar />
      )}
    </Toolbar>
  );
};
