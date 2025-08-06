"use client";

import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Button, Paper } from "@mui/material";
import { isAuthenticated, logout } from "../../utils/auth";
import { NAVIGATION_BUTTONS } from "./Home.constants";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  // Only run on client side after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNavigation = (path: string) => {
    window.location.href = path;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header with Authentication */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h3" component="h1" sx={{ fontWeight: "bold" }}>
          SWAPI Explorer
        </Typography>
        <Box display="flex" gap={1}>
          {!mounted ? (
            // Show placeholder during hydration to prevent layout shift
            <Button variant="outlined" sx={{ minWidth: 100, visibility: "hidden" }}>
              Login
            </Button>
          ) : isAuthenticated() ? (
            <Button
              variant="outlined"
              color="error"
              onClick={logout}
              sx={{ minWidth: 100 }}
            >
              Logout
            </Button>
          ) : (
            <Button variant="outlined" href="/login" sx={{ minWidth: 100 }}>
              Login
            </Button>
          )}
        </Box>
      </Box>

      {/* Welcome Message */}
      <Box textAlign="center" mb={6}>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Welcome to the Star Wars API Explorer
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Choose a category below to explore the galaxy far, far away...
        </Typography>
      </Box>

      {/* Navigation Buttons Grid */}
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
        }}
        gap={3}
      >
        {NAVIGATION_BUTTONS.map((button) => (
          <Paper
            key={button.label}
            elevation={4}
            sx={{
              p: 3,
              textAlign: "center",
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                elevation: 8,
                transform: "translateY(-4px)",
                backgroundColor: "action.hover",
              },
            }}
            onClick={() => handleNavigation(button.path)}
          >
            <Box
              sx={{
                color: button.color,
                mb: 2,
                display: "flex",
                justifyContent: "center",
              }}
            >
              {button.icon}
            </Box>
            <Typography variant="h6" component="h2" gutterBottom>
              {button.label}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {button.description}
            </Typography>
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: button.color,
                "&:hover": {
                  backgroundColor: button.color,
                  opacity: 0.8,
                },
              }}
            >
              Explore {button.label}
            </Button>
          </Paper>
        ))}
      </Box>

      {/* Footer Info */}
      <Box textAlign="center" mt={6}>
        <Typography variant="body2" color="text.secondary">
          Powered by the Star Wars API (SWAPI)
        </Typography>
      </Box>
    </Container>
  );
}
