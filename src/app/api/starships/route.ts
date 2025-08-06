import { NextRequest, NextResponse } from "next/server";
import { getAuthHeader } from "@/utils/getAuthHeader";
import { buildQueryString } from "@/utils/buildQueryString";

const ALLOWED_PARAMS = [
  "sort",
  "order",
  "name",
  "model",
  "cost_in_credits",
  "page",
];

export async function GET(request: NextRequest) {
  try {
    const headers = getAuthHeader(request);

    // Get query parameters from the request
    const { searchParams } = new URL(request.url);
    
    const queryString = buildQueryString(searchParams, ALLOWED_PARAMS);

    const backendUrl = queryString
      ? `http://localhost:3333/starships?${queryString}`
      : "http://localhost:3333/starships";

    // Forward the request to your backend server
    const response = await fetch(backendUrl, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error: response.statusText,
          message: response.statusText,
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Return the response
    return NextResponse.json(data);
  } catch (error) {
    console.error("Starships API error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch starships data from backend server",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
