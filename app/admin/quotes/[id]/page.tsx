'use client';

import { use } from 'react';
import { QuoteDetail } from '@/components/admin/QuoteDetail';

export default function QuoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <QuoteDetail quoteId={id} />;
}
