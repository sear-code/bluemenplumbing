import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);

  const status = searchParams.get('status');
  const search = searchParams.get('search');
  const city = searchParams.get('city');
  const dateRange = searchParams.get('dateRange');
  const sort = searchParams.get('sort') || 'newest';
  const hasSchedule = searchParams.get('has_schedule');
  const month = searchParams.get('month');
  const year = searchParams.get('year');
  const limit = parseInt(searchParams.get('limit') || '50');
  const offset = parseInt(searchParams.get('offset') || '0');

  let query = supabase.from('quotes').select('*', { count: 'exact' });

  // Filter by status (comma-separated for multiple)
  if (status && status !== 'all') {
    const statuses = status.split(',');
    query = query.in('status', statuses);
  }

  // Search by name, email, or quote ID
  if (search) {
    query = query.or(
      `first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%,quote_id.ilike.%${search}%`
    );
  }

  // Filter by city
  if (city) {
    query = query.eq('address_city', city);
  }

  // Filter by date range
  if (dateRange) {
    const now = new Date();
    let startDate: Date;

    switch (dateRange) {
      case 'today':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'week':
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate = new Date(now);
        startDate.setMonth(now.getMonth() - 1);
        break;
      default:
        startDate = new Date(0);
    }

    query = query.gte('created_at', startDate.toISOString());
  }

  // Filter by schedule status
  if (hasSchedule === 'true') {
    query = query.not('scheduled_date', 'is', null);
    if (month && year) {
      const startOfMonth = new Date(parseInt(year), parseInt(month) - 1, 1);
      const endOfMonth = new Date(parseInt(year), parseInt(month), 0);
      query = query
        .gte('scheduled_date', startOfMonth.toISOString().split('T')[0])
        .lte('scheduled_date', endOfMonth.toISOString().split('T')[0]);
    }
  } else if (hasSchedule === 'false') {
    query = query.is('scheduled_date', null);
  }

  // Sort
  switch (sort) {
    case 'oldest':
      query = query.order('created_at', { ascending: true });
      break;
    case 'price_high':
      query = query.order('estimated_price', { ascending: false });
      break;
    case 'price_low':
      query = query.order('estimated_price', { ascending: true });
      break;
    default:
      query = query.order('created_at', { ascending: false });
  }

  // Pagination
  query = query.range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    data,
    total: count,
    limit,
    offset,
  });
}
