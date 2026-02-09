import { NextResponse } from 'next/server';
import { fetchServiceCategories } from '@/services/supabaseServiceApi';
import { getServiceCategories } from '@/services/serviceData';

/**
 * GET /api/services
 * Fetches all active service categories with their items from Supabase
 * Falls back to local data if Supabase is unavailable
 */
export async function GET() {
  try {
    // Try to fetch from Supabase first
    const categories = await fetchServiceCategories();
    
    if (categories && categories.length > 0) {
      return NextResponse.json({
        success: true,
        data: categories,
        source: 'database',
      });
    }
    
    // Fallback to local data if Supabase returns empty
    console.log('Supabase returned empty, falling back to local data');
    const localCategories = getServiceCategories();
    
    return NextResponse.json({
      success: true,
      data: localCategories,
      source: 'local',
    });
  } catch (error) {
    console.error('Error fetching services from Supabase:', error);
    
    // Fallback to local data on error
    try {
      const localCategories = getServiceCategories();
      console.log('Falling back to local service data');
      
      return NextResponse.json({
        success: true,
        data: localCategories,
        source: 'local',
        warning: 'Using local data - Supabase unavailable',
      });
    } catch (fallbackError) {
      console.error('Error loading fallback data:', fallbackError);
      
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to fetch services',
        },
        { status: 500 }
      );
    }
  }
}

