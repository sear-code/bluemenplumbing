'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Clock, CheckCircle2, TrendingUp } from 'lucide-react';

interface StatsProps {
  newToday: number;
  pendingCount: number;
  completedThisWeek: number;
  completedThisMonth: number;
}

const stats = [
  { key: 'newToday' as const, label: 'New Today', icon: FileText, color: 'text-blue-500' },
  { key: 'pendingCount' as const, label: 'Pending', icon: Clock, color: 'text-amber-500' },
  { key: 'completedThisWeek' as const, label: 'Completed (Week)', icon: CheckCircle2, color: 'text-green-500' },
  { key: 'completedThisMonth' as const, label: 'Completed (Month)', icon: TrendingUp, color: 'text-emerald-500' },
];

export function DashboardStats(props: StatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map(({ key, label, icon: Icon, color }) => (
        <Card key={key}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {label}
            </CardTitle>
            <Icon className={`h-4 w-4 ${color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{props[key]}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
