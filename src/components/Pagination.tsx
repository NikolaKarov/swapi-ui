import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

export interface PaginationProps {
  currentPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

export default function Pagination({
  currentPage,
  hasNext,
  hasPrevious,
  onPreviousPage,
  onNextPage,
}: PaginationProps) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={2}
      mt={2}
    >
      <IconButton
        onClick={onPreviousPage}
        disabled={!hasPrevious}
        sx={{
          border: 1,
          borderColor: "divider",
          "&:disabled": {
            opacity: 0.3,
          },
        }}
      >
        <KeyboardArrowLeft />
      </IconButton>

      <Typography
        variant="body2"
        sx={{ minWidth: 100, textAlign: "center" }}
      >
        Page {currentPage}
      </Typography>

      <IconButton
        onClick={onNextPage}
        disabled={!hasNext}
        sx={{
          border: 1,
          borderColor: "divider",
          "&:disabled": {
            opacity: 0.3,
          },
        }}
      >
        <KeyboardArrowRight />
      </IconButton>
    </Box>
  );
}
