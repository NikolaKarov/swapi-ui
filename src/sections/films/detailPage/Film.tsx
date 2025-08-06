"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Button,
} from "@mui/material";
import { Movie as FilmIcon, ArrowBack } from "@mui/icons-material";
import { authenticatedGet, logout } from "../../../utils/auth";
import { FilmData } from "./Film.types";
import { DISPLAY_FIELDS } from "./Film.constants";
import DetailsTable from "../../../components/DetailsTable";

export default function Film() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [film, setFilm] = useState<FilmData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const filmTitle = params.title as string;

  useEffect(() => {
    const fetchFilmData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await authenticatedGet(
          `/api/films/${encodeURIComponent(filmTitle)}`
        );

        if (response.status === 401) {
          logout();
          return;
        }

        if (!response.ok) {
          throw new Error(`${response.statusText} ${response.status}`);
        }

        const result = await response.json();
        setFilm(result);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch film data"
        );
      } finally {
        setLoading(false);
      }
    };

    if (filmTitle) {
      fetchFilmData();
    }
  }, [filmTitle]);

  const handleBackToFilms = () => {
    router.push("/films");
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box display="flex" alignItems="center" mb={4}>
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBackToFilms}
          sx={{ mr: 2 }}
        >
          Back to Films
        </Button>
        <FilmIcon sx={{ fontSize: 32, mr: 2, color: "#9c27b0" }} />
        <Typography variant="h4" component="h1">
          {filmTitle ? decodeURIComponent(filmTitle) : "Film Details"}
        </Typography>
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
          Error fetching film data: {error}
        </Alert>
      )}

      {!loading && !error && !film && (
        <Alert severity="info">Film not found</Alert>
      )}

      {!loading && !error && film && (
        <DetailsTable
          data={film}
          displayFields={DISPLAY_FIELDS}
          headerColor="#9c27b0"
          ariaLabel="film details"
        />
      )}
    </Container>
  );
}
