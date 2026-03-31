import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { quoteStatusUpdateSchema } from '@/lib/validations/admin';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const body = await request.json();

  const parsed = quoteStatusUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: parsed.error.errors[0].message },
      { status: 400 }
    );
  }

  // Get current status
  const { data: current, error: fetchError } = await supabase
    .from('quotes')
    .select('status')
    .eq('id', id)
    .single();

  if (fetchError) {
    return NextResponse.json(
      { success: false, error: fetchError.message },
      { status: 404 }
    );
  }

  // Update status
  const { data, error: updateError } = await supabase
    .from('quotes')
    .update({ status: parsed.data.status })
    .eq('id', id)
    .select()
    .single();

  if (updateError) {
    return NextResponse.json(
      { success: false, error: updateError.message },
      { status: 500 }
    );
  }

  // Record in history
  await supabase.from('quote_status_history').insert({
    quote_id: id,
    previous_status: current.status,
    new_status: parsed.data.status,
    notes: parsed.data.notes || null,
  });

  return NextResponse.json({ success: true, data });
}
