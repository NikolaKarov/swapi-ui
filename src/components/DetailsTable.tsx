/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  Box,
  Chip,
} from "@mui/material";

export interface DisplayField {
  key: string;
  label: string;
}

export interface DetailsTableProps {
  data: { [key: string]: any };
  displayFields: DisplayField[];
  headerColor?: string;
  ariaLabel?: string;
}

export default function DetailsTable({
  data,
  displayFields,
  headerColor = "#1976d2",
  ariaLabel = "details table",
}: DetailsTableProps) {
  const renderFieldValue = (key: string, value: string | string[] | number) => {
    if (!value || value === "unknown" || value === "n/a") {
      return <Typography color="text.secondary">-</Typography>;
    }

    if (Array.isArray(value)) {
      if (value.length === 0) {
        return <Typography color="text.secondary">None</Typography>;
      }
      return (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {value.map((item, index) => (
            <Chip key={index} label={item} size="small" variant="outlined" />
          ))}
        </Box>
      );
    }

    return <Typography>{String(value)}</Typography>;
  };

  return (
    <TableContainer component={Paper} elevation={3}>
      <Table aria-label={ariaLabel}>
        <TableBody>
          {displayFields.map((field) => (
            <TableRow
              key={field.key}
              sx={{
                "&:nth-of-type(odd)": { backgroundColor: "action.hover" },
              }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={{
                  fontWeight: "bold",
                  backgroundColor: headerColor,
                  color: "white",
                  width: "200px",
                  verticalAlign: "top",
                }}
              >
                {field.label}
              </TableCell>
              <TableCell sx={{ verticalAlign: "top" }}>
                {renderFieldValue(field.key, data[field.key])}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
