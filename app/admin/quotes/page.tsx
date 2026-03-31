'use client';

import { useSearchParams } from 'next/navigation';
import { QuotesTable } from '@/components/admin/QuotesTable';

export default function QuotesPage() {
  const searchParams = useSearchParams();
  const initialStatus = searchParams.get('status') || undefined;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Quotes</h1>
        <p className="text-muted-foreground">Manage customer quote requests.</p>
      </div>
      <QuotesTable initialStatus={initialStatus} />
    </div>
  );
}
