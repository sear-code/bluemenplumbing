import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const year = parseInt(searchParams.get('year') || new Date().getFullYear().toString());

  // Fetch completed quotes for the year
  const startOfYear = `${year}-01-01T00:00:00.000Z`;
  const endOfYear = `${year + 1}-01-01T00:00:00.000Z`;

  const { data: quotes, error } = await supabase
    .from('quotes')
    .select('estimated_price, distance_fee, urgency, created_at, updated_at')
    .eq('status', 'completed')
    .gte('created_at', startOfYear)
    .lt('created_at', endOfYear)
    .order('created_at', { ascending: true });

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  // Fetch current markup settings
  const { data: settings } = await supabase
    .from('admin_settings')
    .select('markup_percentage')
    .eq('id', 'global')
    .single();

  const markupPercentage = settings?.markup_percentage ?? 20;

  // Group by month
  const months: Record<number, { revenue: number; baseRevenue: number; count: number; distanceFees: number }> = {};
  for (let m = 0; m < 12; m++) {
    months[m] = { revenue: 0, baseRevenue: 0, count: 0, distanceFees: 0 };
  }

  for (const q of quotes || []) {
    const month = new Date(q.created_at).getMonth();
    const price = q.estimated_price || 0;
    const distanceFee = q.distance_fee || 0;
    const basePrice = Math.round(price / (1 + markupPercentage / 100));

    months[month].revenue += price + distanceFee;
    months[month].baseRevenue += basePrice + distanceFee;
    months[month].count += 1;
    months[month].distanceFees += distanceFee;
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const monthly = Object.entries(months).map(([m, data]) => ({
    month: monthNames[parseInt(m)],
    monthIndex: parseInt(m),
    ...data,
    markupAmount: data.revenue - data.baseRevenue,
  }));

  const totalRevenue = monthly.reduce((s, m) => s + m.revenue, 0);
  const totalBase = monthly.reduce((s, m) => s + m.baseRevenue, 0);
  const totalJobs = monthly.reduce((s, m) => s + m.count, 0);
  const totalDistanceFees = monthly.reduce((s, m) => s + m.distanceFees, 0);

  return NextResponse.json({
    success: true,
    data: {
      year,
      markupPercentage: Number(markupPercentage),
      monthly,
      totals: {
        revenue: totalRevenue,
        baseRevenue: totalBase,
        markupAmount: totalRevenue - totalBase,
        jobs: totalJobs,
        distanceFees: totalDistanceFees,
      },
    },
  });
}
