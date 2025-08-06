import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

export interface SortOption {
  value: string;
  label: string;
}

export interface SortProps {
  sortBy: string;
  order: string;
  sortOptions: SortOption[];
  onSortByChange: (event: SelectChangeEvent) => void;
  onOrderChange: (event: SelectChangeEvent) => void;
}

export default function Sort({
  sortBy,
  order,
  sortOptions,
  onSortByChange,
  onOrderChange,
}: SortProps) {
  return (
    <>
      <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Sort By</InputLabel>
        <Select value={sortBy} onChange={onSortByChange} label="Sort By">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {sortOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Order</InputLabel>
        <Select value={order} onChange={onOrderChange} label="Order">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}
