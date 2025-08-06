// Auth utility functions for handling tokens and authenticated requests

export const TOKEN_KEY = "authToken";

export const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
};

export const setAuthToken = (token: string): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeAuthToken = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
};

export const isAuthenticated = (): boolean => {
  return getAuthToken() !== null;
};

// Enhanced fetch function that automatically includes auth token
export const authenticatedFetch = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = getAuthToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  // Add Authorization header if token exists
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return fetch(url, {
    ...options,
    headers,
  });
};

// Convenience method for GET requests
export const authenticatedGet = (url: string, options: RequestInit = {}) =>
  authenticatedFetch(url, { ...options, method: "GET" });

// Logout function
export const logout = (): void => {
  removeAuthToken();
  // Optionally redirect to login page
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
};
