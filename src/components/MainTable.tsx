/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export interface DisplayColumn {
  key: string;
  label: string;
}

export interface MainTableProps {
  data: { [key: string]: any }[];
  displayColumns: DisplayColumn[];
  headerColor?: string;
  ariaLabel?: string;
  onRowClick?: (item: any) => void;
  getRowKey?: (item: any, index: number) => string;
  renderCellValue?: (value: any) => React.ReactNode;
}

export default function MainTable({
  data,
  displayColumns,
  headerColor = "#1976d2",
  ariaLabel = "data table",
  onRowClick,
  getRowKey,
  renderCellValue,
}: MainTableProps) {
  const defaultRenderCellValue = (value: string | string[] | number) => {
    if (!value || value === "unknown" || value === "n/a") return "-";
    if (Array.isArray(value)) return value.length;
    return String(value);
  };

  const cellRenderer = renderCellValue || defaultRenderCellValue;

  const defaultGetRowKey = (item: any, index: number) => 
    item.url || item.id || index.toString();

  const rowKeyGetter = getRowKey || defaultGetRowKey;

  return (
    <TableContainer component={Paper} elevation={3}>
      <Table sx={{ minWidth: 650 }} aria-label={ariaLabel}>
        <TableHead>
          <TableRow sx={{ backgroundColor: headerColor }}>
            {displayColumns.map((column) => (
              <TableCell
                key={column.key}
                sx={{
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow
              key={rowKeyGetter(item, index)}
              onClick={() => onRowClick?.(item)}
              sx={{
                "&:nth-of-type(odd)": { backgroundColor: "action.hover" },
                "&:hover": {
                  backgroundColor: "action.selected",
                  cursor: onRowClick ? "pointer" : "default",
                },
              }}
            >
              {displayColumns.map((column) => (
                <TableCell key={column.key}>
                  {cellRenderer(item[column.key])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
