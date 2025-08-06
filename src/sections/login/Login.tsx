"use client";

import React, { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
} from "@mui/icons-material";
import { setAuthToken } from "../../utils/auth";
import { LoginFormData, LoginResponse } from "./Login.types";

export default function Login() {
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear errors when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Basic validation
    if (!formData.username.trim() || !formData.password.trim()) {
      setError("Please enter both username and password");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data: LoginResponse = await response.json();

      if (response.ok) {
        setSuccess(data.message || "Login successful!");

        // Store the token using utility function
        const token = data.access_token;
        if (token) {
          setAuthToken(token);
          window.location.href = "/";
        }

        // Clear form
        setFormData({ username: "", password: "" });

        // Redirect to main page after successful login
        console.log("Login successful:", data);
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      } else {
        setError(
          data.message || `Login failed with status: ${response.status}`
        );
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Network error - please check if the server is running"
      );
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 2 }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
          <LoginIcon sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            Enter your credentials to access your account
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            margin="normal"
            required
            disabled={loading}
            autoComplete="username"
            autoFocus
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleInputChange}
            margin="normal"
            required
            disabled={loading}
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={togglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 3, mb: 2, py: 1.5 }}
            startIcon={loading ? <CircularProgress size={20} /> : <LoginIcon />}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
