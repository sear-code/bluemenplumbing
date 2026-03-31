'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { DollarSign, TrendingUp, Percent, Briefcase } from 'lucide-react';

interface MonthlyData {
  month: string;
  monthIndex: number;
  revenue: number;
  baseRevenue: number;
  count: number;
  distanceFees: number;
  markupAmount: number;
}

interface RevenueData {
  year: number;
  markupPercentage: number;
  monthly: MonthlyData[];
  totals: {
    revenue: number;
    baseRevenue: number;
    markupAmount: number;
    jobs: number;
    distanceFees: number;
  };
}

const fetchRevenue = async (year: number): Promise<RevenueData> => {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();
  const res = await fetch(`/api/admin/revenue?year=${year}`, {
    headers: {
      Authorization: `Bearer ${session?.access_token || ''}`,
    },
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error);
  return json.data;
};

const fmt = (n: number) => `$${n.toLocaleString()}`;

export function RevenueTracker() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-revenue', year],
    queryFn: () => fetchRevenue(year),
  });

  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
  const currentMonth = new Date().getMonth();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2"><Skeleton className="h-4 w-24" /></CardHeader>
              <CardContent><Skeleton className="h-8 w-20" /></CardContent>
            </Card>
          ))}
        </div>
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!data) return null;

  const { totals, monthly, markupPercentage } = data;

  return (
    <div className="space-y-6">
      {/* Year selector */}
      <div className="flex items-center justify-between">
        <div />
        <Select value={String(year)} onValueChange={(v) => setYear(parseInt(v))}>
          <SelectTrigger className="w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {years.map((y) => (
              <SelectItem key={y} value={String(y)}>{y}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fmt(totals.revenue)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              After {markupPercentage}% markup
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Base Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fmt(totals.baseRevenue)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Before markup
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Markup Earned</CardTitle>
            <Percent className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fmt(totals.markupAmount)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {markupPercentage}% on services
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totals.jobs}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {totals.jobs > 0
                ? `Avg ${fmt(Math.round(totals.revenue / totals.jobs))} per job`
                : 'No completed jobs'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly breakdown table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Monthly Breakdown</CardTitle>
          <CardDescription>
            Revenue by month for {year}. Markup rate: {markupPercentage}%.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead className="text-right">Jobs</TableHead>
                  <TableHead className="text-right">Base Revenue</TableHead>
                  <TableHead className="text-right">Markup ({markupPercentage}%)</TableHead>
                  <TableHead className="text-right">Distance Fees</TableHead>
                  <TableHead className="text-right">Total Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {monthly.map((m) => {
                  const isFuture = year === currentYear && m.monthIndex > currentMonth;
                  const isCurrent = year === currentYear && m.monthIndex === currentMonth;

                  return (
                    <TableRow
                      key={m.month}
                      className={isFuture ? 'opacity-40' : isCurrent ? 'bg-primary/5' : ''}
                    >
                      <TableCell className="font-medium">
                        {m.month}
                        {isCurrent && (
                          <span className="ml-2 text-xs text-primary">(current)</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">{m.count}</TableCell>
                      <TableCell className="text-right">{fmt(m.baseRevenue)}</TableCell>
                      <TableCell className="text-right text-amber-600 dark:text-amber-400">
                        {m.markupAmount > 0 ? `+${fmt(m.markupAmount)}` : '—'}
                      </TableCell>
                      <TableCell className="text-right">
                        {m.distanceFees > 0 ? fmt(m.distanceFees) : '—'}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {m.revenue > 0 ? fmt(m.revenue) : '—'}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell className="font-bold">Total</TableCell>
                  <TableCell className="text-right font-bold">{totals.jobs}</TableCell>
                  <TableCell className="text-right font-bold">{fmt(totals.baseRevenue)}</TableCell>
                  <TableCell className="text-right font-bold text-amber-600 dark:text-amber-400">
                    +{fmt(totals.markupAmount)}
                  </TableCell>
                  <TableCell className="text-right font-bold">{fmt(totals.distanceFees)}</TableCell>
                  <TableCell className="text-right font-bold">{fmt(totals.revenue)}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
