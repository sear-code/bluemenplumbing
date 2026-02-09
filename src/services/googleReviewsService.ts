/**
 * Google Reviews Service
 * Fetches and manages Google Business reviews using the Google Places API
 */

export interface GoogleReview {
  author_name: string;
  author_url?: string;
  language: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

export interface GooglePlaceDetails {
  name: string;
  rating: number;
  user_ratings_total: number;
  reviews: GoogleReview[];
}

interface GooglePlacesResponse {
  result?: {
    name: string;
    rating: number;
    user_ratings_total: number;
    reviews?: GoogleReview[];
  };
  status: string;
  error_message?: string;
}

/**
 * Fetches Google reviews for the business
 * Uses Google Places API - Place Details endpoint
 */
export const fetchGoogleReviews = async (): Promise<GooglePlaceDetails | null> => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
  const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    console.error('Missing Google Places API key or Place ID. Please configure environment variables.');
    return null;
  }

  try {
    // Note: In production, this should be called from a server-side API route
    // to protect your API key. For now, we're using NEXT_PUBLIC_ prefix
    // which exposes it to the client.
    const response = await fetch(
      `/api/google-reviews`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: GooglePlacesResponse = await response.json();

    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
      throw new Error(data.error_message || `Google Places API error: ${data.status}`);
    }

    if (!data.result) {
      return null;
    }

    return {
      name: data.result.name,
      rating: data.result.rating,
      user_ratings_total: data.result.user_ratings_total,
      reviews: data.result.reviews || [],
    };
  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    return null;
  }
};

/**
 * Formats the review time to a more readable format
 */
export const formatReviewTime = (relativeTime: string): string => {
  return relativeTime;
};

/**
 * Gets the initials from a name for avatar display
 */
export const getInitials = (name: string): string => {
  const names = name.split(' ');
  if (names.length >= 2) {
    return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase();
  }
  return name.charAt(0).toUpperCase();
};

/**
 * Sorts reviews by date (most recent first)
 */
export const sortReviewsByDate = (reviews: GoogleReview[]): GoogleReview[] => {
  return [...reviews].sort((a, b) => b.time - a.time);
};

/**
 * Filters reviews by minimum rating
 */
export const filterReviewsByRating = (
  reviews: GoogleReview[],
  minRating: number = 4
): GoogleReview[] => {
  return reviews.filter((review) => review.rating >= minRating);
};

/**
 * Gets a limited number of top reviews
 */
export const getTopReviews = (
  reviews: GoogleReview[],
  limit: number = 3,
  minRating: number = 4
): GoogleReview[] => {
  const filtered = filterReviewsByRating(reviews, minRating);
  const sorted = sortReviewsByDate(filtered);
  return sorted.slice(0, limit);
};




