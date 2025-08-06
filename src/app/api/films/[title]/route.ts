import { NextRequest, NextResponse } from 'next/server';
import { getAuthHeader } from '@/utils/getAuthHeader';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ title: string }> }
) {
  try {
    const headers = getAuthHeader(request);

    // Get the film title from the URL params
    const { title } = await params;
    const filmTitle = title;
    
    if (!filmTitle) {
      return NextResponse.json(
        { error: 'Film title is required' },
        { status: 400 }
      );
    }

    // Forward the request to the backend server
    const response = await fetch(`http://localhost:3333/films/${filmTitle}`, {
      method: 'GET',
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
    console.error('Film API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch film data from backend server',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 