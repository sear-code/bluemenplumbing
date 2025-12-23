import { NextResponse } from 'next/server';

/**
 * API Route for fetching Google reviews
 * This server-side route protects the API key from being exposed to the client
 */
export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
  const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return NextResponse.json(
      { 
        status: 'ERROR',
        error_message: 'Missing Google Places API key or Place ID configuration' 
      },
      { status: 500 }
    );
  }

  try {
    // Google Places API - Place Details endpoint
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&key=${apiKey}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Cache the response for 24 hours to avoid excessive API calls
      next: { revalidate: 86400 }
    });

    if (!response.ok) {
      throw new Error(`Google API HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    return NextResponse.json(
      { 
        status: 'ERROR',
        error_message: error instanceof Error ? error.message : 'Failed to fetch reviews' 
      },
      { status: 500 }
    );
  }
}

