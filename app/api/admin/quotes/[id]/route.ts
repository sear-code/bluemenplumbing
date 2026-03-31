import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { quoteUpdateSchema } from '@/lib/validations/admin';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('quotes')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: error.code === 'PGRST116' ? 404 : 500 }
    );
  }

  // Fetch status history
  const { data: history } = await supabase
    .from('quote_status_history')
    .select('*')
    .eq('quote_id', id)
    .order('created_at', { ascending: false });

  // Resolve selected service/category IDs to names
  let resolvedServices: { id: string; name: string; unitPrice: number }[] = [];
  let resolvedCategories: { id: string; name: string }[] = [];

  const serviceIds = data.selected_services || [];
  const categoryIds = data.selected_categories || [];

  if (serviceIds.length > 0) {
    const { data: items } = await supabase
      .from('service_items')
      .select('id, name, unit_price')
      .in('id', serviceIds);
    resolvedServices = (items || []).map((i: { id: string; name: string; unit_price: number }) => ({
      id: i.id,
      name: i.name,
      unitPrice: i.unit_price,
    }));
  }

  if (categoryIds.length > 0) {
    const { data: cats } = await supabase
      .from('service_categories')
      .select('id, name')
      .in('id', categoryIds);
    resolvedCategories = cats || [];
  }

  return NextResponse.json({
    success: true,
    data: {
      ...data,
      status_history: history || [],
      resolved_services: resolvedServices,
      resolved_categories: resolvedCategories,
    },
  });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const { error } = await supabase
    .from('quotes')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const body = await request.json();

  const parsed = quoteUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: parsed.error.errors[0].message },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from('quotes')
    .update(parsed.data)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, data });
}
