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
import { Public as PlanetIcon, ArrowBack } from "@mui/icons-material";
import { authenticatedGet, logout } from "../../../utils/auth";
import { PlanetData } from "./Planet.types";
import { DISPLAY_FIELDS } from "./Planet.constants";
import DetailsTable from "../../../components/DetailsTable";

export default function Planet() {
  const params = useParams();
  const router = useRouter();
  const [planet, setPlanet] = useState<PlanetData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const planetName = params.name as string;

  useEffect(() => {
    const fetchPlanetData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await authenticatedGet(
          `/api/planets/${encodeURIComponent(planetName)}`
        );
        if (response.status === 401) {
          logout();
          return;
        }

        if (!response.ok) {
          throw new Error(`${response.statusText} ${response.status}`);
        }

        const result = await response.json();
        setPlanet(result);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch planet data"
        );
      } finally {
        setLoading(false);
      }
    };

    if (planetName) {
      fetchPlanetData();
    }
  }, [planetName]);

  const handleBackToPlanets = () => {
    router.push("/planets");
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box display="flex" alignItems="center" mb={4}>
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBackToPlanets}
          sx={{ mr: 2 }}
        >
          Back to Planets
        </Button>
        <PlanetIcon sx={{ fontSize: 32, mr: 2, color: "#2e7d32" }} />
        <Typography variant="h4" component="h1">
          {planetName ? decodeURIComponent(planetName) : "Planet Details"}
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
          Error fetching planet data: {error}
        </Alert>
      )}

      {!loading && !error && !planet && (
        <Alert severity="info">Planet not found</Alert>
      )}

      {!loading && !error && planet && (
        <DetailsTable
          data={planet}
          displayFields={DISPLAY_FIELDS}
          headerColor="#2e7d32"
          ariaLabel="planet details"
        />
      )}
    </Container>
  );
}
