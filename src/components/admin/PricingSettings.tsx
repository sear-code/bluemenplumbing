'use client';

import { useState, useEffect } from 'react';
import { useAdminSettings, useUpdateSettings } from '@/hooks/useAdminQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { Loader2, Save } from 'lucide-react';

export function PricingSettings() {
  const { data: settings, isLoading } = useAdminSettings();
  const updateSettings = useUpdateSettings();

  const [form, setForm] = useState({
    markup_percentage: 20,
    emergency_fee: 250,
    travel_rate_per_km: 1,
    max_service_radius_km: 60,
  });

  useEffect(() => {
    if (settings) {
      setForm({
        markup_percentage: Number(settings.markup_percentage),
        emergency_fee: settings.emergency_fee,
        travel_rate_per_km: Number(settings.travel_rate_per_km),
        max_service_radius_km: settings.max_service_radius_km,
      });
    }
  }, [settings]);

  const handleSave = () => {
    updateSettings.mutate(form, {
      onSuccess: () => toast.success('Settings saved'),
      onError: (err) => toast.error(err.message),
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Price Markup</CardTitle>
          <CardDescription>
            Applied to all service prices for customer-facing display.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Markup Percentage (%)</Label>
              <Input
                type="number"
                min={0}
                max={100}
                value={form.markup_percentage}
                onChange={(e) =>
                  setForm({ ...form, markup_percentage: parseFloat(e.target.value) || 0 })
                }
              />
              <p className="text-xs text-muted-foreground">
                Example: A $100 service displays as ${Math.round(100 * (1 + form.markup_percentage / 100))}
              </p>
            </div>
            <div className="space-y-2">
              <Label>Emergency Base Fee ($)</Label>
              <Input
                type="number"
                min={0}
                value={form.emergency_fee}
                onChange={(e) =>
                  setForm({ ...form, emergency_fee: parseInt(e.target.value) || 0 })
                }
              />
              <p className="text-xs text-muted-foreground">
                Displays as ${Math.round(form.emergency_fee * (1 + form.markup_percentage / 100))} after markup
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Travel Fees</CardTitle>
          <CardDescription>
            Distance-based fees for extended service areas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Rate per KM ($)</Label>
              <Input
                type="number"
                min={0}
                step={0.5}
                value={form.travel_rate_per_km}
                onChange={(e) =>
                  setForm({ ...form, travel_rate_per_km: parseFloat(e.target.value) || 0 })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Max Service Radius (KM)</Label>
              <Input
                type="number"
                min={0}
                value={form.max_service_radius_km}
                onChange={(e) =>
                  setForm({ ...form, max_service_radius_km: parseInt(e.target.value) || 0 })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} disabled={updateSettings.isPending}>
        {updateSettings.isPending ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Save className="mr-2 h-4 w-4" />
        )}
        Save Settings
      </Button>
    </div>
  );
}
