import { NextRequest } from "next/server";

export const getAuthHeader = (request: NextRequest) => {
  // Get the Authorization header from the incoming request
  const authHeader = request.headers.get("authorization");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Forward the Authorization header if it exists
  if (authHeader) {
    headers["Authorization"] = authHeader;
  }

  return headers;
};
