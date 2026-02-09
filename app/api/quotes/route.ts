import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { QuoteInsert } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const quoteData = await request.json();
    
    // Generate unique quote ID
    const quoteId = `BMP-${Date.now()}`;
    
    // Prepare data for database insertion
    const quoteInsert: QuoteInsert = {
      quote_id: quoteId,
      first_name: quoteData.customerInfo.firstName,
      last_name: quoteData.customerInfo.lastName,
      email: quoteData.customerInfo.email,
      phone: quoteData.customerInfo.phone,
      property_type: quoteData.propertyType || null,
      address_street: quoteData.address?.street || null,
      address_city: quoteData.address?.city || null,
      address_state: quoteData.address?.state || null,
      address_zip: quoteData.address?.zipCode || null,
      selected_services: quoteData.selectedServices || [],
      selected_categories: quoteData.selectedCategories || [],
      custom_service: quoteData.customService || null,
      problem_description: quoteData.problemDescription || null,
      urgency: quoteData.urgency || 'standard',
      estimated_price: quoteData.estimatedPrice || 0,
      estimated_duration: quoteData.estimatedDuration || 120,
      status: 'submitted',
      access_notes: quoteData.accessNotes || null,
      preferred_datetime: quoteData.preferredDateTime || null,
      photos: quoteData.photos || [],
    };

    // Insert quote into database
    const { data, error } = await supabase
      .from('quotes')
      .insert(quoteInsert)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(`Database error: ${error.message}`);
    }

    // Prepare response
    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + 30);

    const responseData = {
      quoteId,
      estimatedPrice: quoteData.estimatedPrice || 0,
      estimatedDuration: quoteData.estimatedDuration || 120,
      validUntil,
      message: 'Your quote request has been received. We will contact you within 24 hours.',
    };

    return NextResponse.json({
      success: true,
      data: responseData,
      dbRecord: data,
    });
  } catch (error) {
    console.error('Quote submission error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to submit quote',
      },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve quotes (for admin use)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const quoteId = searchParams.get('quoteId');
    const status = searchParams.get('status');

    let query = supabase
      .from('quotes')
      .select('*')
      .order('created_at', { ascending: false });

    // Apply filters if provided
    if (email) {
      query = query.eq('email', email);
    }
    if (quoteId) {
      query = query.eq('quote_id', quoteId);
    }
    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(`Database error: ${error.message}`);
    }

    return NextResponse.json({
      success: true,
      data: data || [],
      count: data?.length || 0,
    });
  } catch (error) {
    console.error('Quote retrieval error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to retrieve quotes',
      },
      { status: 500 }
    );
  }
}
