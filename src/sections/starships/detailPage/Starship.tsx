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
import { RocketLaunch as StarshipIcon, ArrowBack } from "@mui/icons-material";
import { authenticatedGet, logout } from "../../../utils/auth";
import { StarshipData } from "./Starship.types";
import { DISPLAY_FIELDS } from "./Starship.constants";
import DetailsTable from "../../../components/DetailsTable";

export default function Starship() {
  const params = useParams();
  const router = useRouter();
  const [starship, setStarship] = useState<StarshipData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const starshipName = params.name as string;

  useEffect(() => {
    const fetchStarshipData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await authenticatedGet(
          `/api/starships/${encodeURIComponent(starshipName)}`
        );

        if (response.status === 401) {
          logout();
          return;
        }

        if (!response.ok) {
          throw new Error(`${response.statusText} ${response.status}`);
        }

        const result = await response.json();
        setStarship(result);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch starship data"
        );
      } finally {
        setLoading(false);
      }
    };

    if (starshipName) {
      fetchStarshipData();
    }
  }, [starshipName]);

  const handleBackToStarships = () => {
    router.push("/starships");
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box display="flex" alignItems="center" mb={4}>
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBackToStarships}
          sx={{ mr: 2 }}
        >
          Back to Starships
        </Button>
        <StarshipIcon sx={{ fontSize: 32, mr: 2, color: "#ed6c02" }} />
        <Typography variant="h4" component="h1">
          {starshipName ? decodeURIComponent(starshipName) : "Starship Details"}
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
          Error fetching starship data: {error}
        </Alert>
      )}

      {!loading && !error && !starship && (
        <Alert severity="info">Starship not found</Alert>
      )}

      {!loading && !error && starship && (
        <DetailsTable
          data={starship}
          displayFields={DISPLAY_FIELDS}
          headerColor="#ed6c02"
          ariaLabel="starship details"
        />
      )}
    </Container>
  );
}
