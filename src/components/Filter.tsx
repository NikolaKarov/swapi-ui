import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  TextField,
} from "@mui/material";

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterProps {
  filterBy: string;
  filterValue: string;
  filterOptions: FilterOption[];
  onFilterByChange: (event: SelectChangeEvent) => void;
  onFilterValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Filter({
  filterBy,
  filterValue,
  filterOptions,
  onFilterByChange,
  onFilterValueChange,
}: FilterProps) {
  return (
    <>
      <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Filter By</InputLabel>
        <Select
          value={filterBy}
          onChange={onFilterByChange}
          label="Filter By"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {filterOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {filterBy && (
        <TextField
          variant="outlined"
          size="small"
          label={`Filter by ${filterBy}`}
          value={filterValue}
          onChange={onFilterValueChange}
          placeholder={`Enter ${filterBy}...`}
          sx={{ minWidth: 200 }}
        />
      )}
    </>
  );
}
