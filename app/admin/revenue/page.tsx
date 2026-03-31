'use client';

import { RevenueTracker } from '@/components/admin/RevenueTracker';

export default function RevenuePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Revenue</h1>
        <p className="text-muted-foreground">Track monthly earnings, markup, and job volume.</p>
      </div>
      <RevenueTracker />
    </div>
  );
}
