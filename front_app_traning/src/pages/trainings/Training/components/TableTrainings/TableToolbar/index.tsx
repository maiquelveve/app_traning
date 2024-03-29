import { Toolbar } from "@mui/material";

import { SelectedToobar } from "./SelectedToobar";
import { DeafaultToolbar } from "./DefaultToobar";

export const TableToolbar: React.FC<ITableToolbarSelectedTrainingProps> = ({ selectedData, disableSelectedData }) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...((selectedData?.training !== "" && selectedData) && {
          bgcolor: (theme) => theme.palette.primary.main,
        }),
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        mb: 1,
      }}
    >
      {(selectedData?.training !== "" && selectedData) ? (
        <SelectedToobar selectedData={selectedData} disableSelectedData={disableSelectedData} />
      ) : (
        <DeafaultToolbar />
      )}
    </Toolbar>
  );
};
