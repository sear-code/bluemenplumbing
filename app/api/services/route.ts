import { NextResponse } from 'next/server';
import { fetchServiceCategories } from '@/services/supabaseServiceApi';

/**
 * GET /api/services
 * Fetches all active service categories with their items from Supabase
 */
export async function GET() {
  try {
    const categories = await fetchServiceCategories();
    
    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch services',
      },
      { status: 500 }
    );
  }
}

