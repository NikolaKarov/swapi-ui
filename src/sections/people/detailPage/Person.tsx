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
import { Person as PersonIcon, ArrowBack } from "@mui/icons-material";
import { authenticatedGet, logout } from "../../../utils/auth";
import { PersonData } from "./Person.types";
import { DISPLAY_FIELDS } from "./Person.constants";
import DetailsTable from "../../../components/DetailsTable";

export default function Person() {
  const params = useParams();
  const router = useRouter();
  const [person, setPerson] = useState<PersonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const personName = params.name as string;

  useEffect(() => {
    const fetchPersonData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await authenticatedGet(
          `/api/people/${encodeURIComponent(personName)}`
        );

        if (response.status === 401) {
          logout();
          return;
        }

        if (!response.ok) {
          throw new Error(`${response.statusText} ${response.status}`);
        }

        const result = await response.json();
        setPerson(result);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch person data"
        );
      } finally {
        setLoading(false);
      }
    };

    if (personName) {
      fetchPersonData();
    }
  }, [personName]);

  const handleBackToPeople = () => {
    router.push("/people");
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box display="flex" alignItems="center" mb={4}>
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBackToPeople}
          sx={{ mr: 2 }}
        >
          Back to People
        </Button>
        <PersonIcon sx={{ fontSize: 32, mr: 2, color: "primary.main" }} />
        <Typography variant="h4" component="h1">
          {personName ? decodeURIComponent(personName) : "Character Details"}
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
          Error fetching character data: {error}
        </Alert>
      )}

      {!loading && !error && !person && (
        <Alert severity="info">Character not found</Alert>
      )}

      {!loading && !error && person && (
        <DetailsTable
          data={person}
          displayFields={DISPLAY_FIELDS}
          headerColor="primary.main"
          ariaLabel="character details"
        />
      )}
    </Container>
  );
}
