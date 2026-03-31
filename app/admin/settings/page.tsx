'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PricingSettings } from '@/components/admin/PricingSettings';
import { ServiceAreaManager } from '@/components/admin/ServiceAreaManager';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Configure pricing and service areas.</p>
      </div>

      <Tabs defaultValue="pricing">
        <TabsList>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="areas">Service Areas</TabsTrigger>
        </TabsList>
        <TabsContent value="pricing">
          <PricingSettings />
        </TabsContent>
        <TabsContent value="areas">
          <ServiceAreaManager />
        </TabsContent>
      </Tabs>
    </div>
  );
}
