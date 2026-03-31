'use client';

import dynamic from 'next/dynamic';

const ServicesManagement = dynamic(
  () => import('@/components/admin/ServicesManagement').then(mod => ({ default: mod.default })),
  { ssr: false }
);

export default function ServicesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Services</h1>
        <p className="text-muted-foreground">Manage service categories and items.</p>
      </div>
      <ServicesManagement />
    </div>
  );
}
