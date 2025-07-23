import { Box, styled, type BoxProps } from "@mui/material";

export interface DataTableStyledProps extends BoxProps {
  noBorderFirstColumn?: boolean;
}

export const DataTableStyled = styled(Box, {
  shouldForwardProp: (prop) => prop !== "noBorderFirstColumn",
})<DataTableStyledProps>(({ noBorderFirstColumn = false }) => ({
  "& .p-datatable-table td, th": {
    borderBottomWidth: "1px",
  },
  "& .p-datatable-table td:first-of-type, th:first-of-type": {
    borderBottomWidth: noBorderFirstColumn ? "0px" : "1px",
  },
}));
