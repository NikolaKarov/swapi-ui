"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import { Public as PlanetIcon, ArrowBack } from "@mui/icons-material";
import { authenticatedGet, logout } from "../../../utils/auth";
import { PlanetData } from "./Planets.types";
import {
  DISPLAY_COLUMNS,
  SORT_OPTIONS,
  FILTER_OPTIONS,
} from "./Planets.constants";
import Pagination from "../../../components/Pagination";
import MainTable from "../../../components/MainTable";
import Sort from "../../../components/Sort";
import Filter from "../../../components/Filter";

export default function Planets() {
  const router = useRouter();
  const [data, setData] = useState<PlanetData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [sortBy, setSortBy] = useState<string>("");
  const [order, setOrder] = useState<string>("");
  const [filterBy, setFilterBy] = useState<string>("");
  const [filterValue, setFilterValue] = useState<string>("");
  const [debouncedFilterValue, setDebouncedFilterValue] = useState<string>("");

  // Debounce the filter value
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilterValue(filterValue);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [filterValue]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Build query parameters
        const params = new URLSearchParams();
        if (sortBy) params.append("sort", sortBy);
        if (order) params.append("order", order);
        if (currentPage > 1) params.append("page", currentPage.toString());

        // Add filter parameters
        if (filterBy && debouncedFilterValue) {
          params.append(filterBy, debouncedFilterValue);
        }

        const queryString = params.toString();
        const url = queryString
          ? `/api/planets?${queryString}`
          : "/api/planets";

        const response = await authenticatedGet(url);

        if (response.status === 401) {
          logout();
        }

        if (!response.ok) {
          throw new Error(`${response.statusText} ${response.status}`);
        }

        const responseData = await response.json();

        // Handle SWAPI response structure
        const resultsData = responseData.results || [];
        setData(resultsData);

        // Set pagination state based on response
        setHasNext(!!responseData.next);
        setHasPrevious(!!responseData.previous);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch planets data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sortBy, order, filterBy, debouncedFilterValue, currentPage]);

  const handleBackHome = () => {
    window.location.href = "/";
  };

  const handleRowClick = (planet: PlanetData) => {
    router.push(`/planets/${encodeURIComponent(planet.name)}`);
  };

  const handleSortByChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
  };

  const handleOrderChange = (event: SelectChangeEvent) => {
    setOrder(event.target.value);
  };

  const handleFilterByChange = (event: SelectChangeEvent) => {
    setFilterBy(event.target.value);
    // Reset filter value when changing filter type
    setFilterValue("");
    setDebouncedFilterValue("");
  };

  const handleFilterValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterValue(event.target.value);
  };

  const handlePreviousPage = () => {
    if (hasPrevious && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (hasNext) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderCellValue = (value: string | string[]) => {
    if (!value || value === "unknown" || value === "n/a") return "-";
    if (Array.isArray(value)) return value.length;
    return String(value);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" alignItems="center" mb={4}>
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBackHome}
          sx={{ mr: 2 }}
        >
          Back to Home
        </Button>
        <PlanetIcon sx={{ fontSize: 32, mr: 2, color: "#2e7d32" }} />
        <Typography variant="h4" component="h1">
          Star Wars Planets
        </Typography>
      </Box>

      <Box display="flex" gap={2} mb={3} flexWrap="wrap">
        {/* Sorting Controls */}
        <Sort
          sortBy={sortBy}
          order={order}
          sortOptions={SORT_OPTIONS}
          onSortByChange={handleSortByChange}
          onOrderChange={handleOrderChange}
        />

        {/* Filtering Controls */}
        <Filter
          filterBy={filterBy}
          filterValue={filterValue}
          filterOptions={FILTER_OPTIONS}
          onFilterByChange={handleFilterByChange}
          onFilterValueChange={handleFilterValueChange}
        />
      </Box>

      {loading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight={200}
        >
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Error fetching planets data: {error}
        </Alert>
      )}

      {!loading && !error && data.length === 0 && (
        <Alert severity="info">No planets data available</Alert>
      )}

      {!loading && !error && data.length > 0 && (
        <>
          <MainTable
            data={data}
            displayColumns={DISPLAY_COLUMNS}
            headerColor="#2e7d32"
            ariaLabel="planets table"
            onRowClick={handleRowClick}
            renderCellValue={renderCellValue}
          />

          <Pagination
            currentPage={currentPage}
            hasNext={hasNext}
            hasPrevious={hasPrevious}
            onPreviousPage={handlePreviousPage}
            onNextPage={handleNextPage}
          />
        </>
      )}
    </Container>
  );
}
