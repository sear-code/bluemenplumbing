'use client';

import Link from 'next/link';
import { useAdminDashboardStats } from '@/hooks/useAdminQueries';
import { DashboardStats } from '@/components/admin/DashboardStats';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { FileText, Calendar } from 'lucide-react';
import { format } from 'date-fns';

export default function AdminDashboard() {
  const { newToday, pendingCount, completedThisWeek, completedThisMonth, recentQuotes, isLoading } =
    useAdminDashboardStats();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your plumbing business.</p>
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-12" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <DashboardStats
          newToday={newToday}
          pendingCount={pendingCount}
          completedThisWeek={completedThisWeek}
          completedThisMonth={completedThisMonth}
        />
      )}

      <div className="flex gap-3">
        <Button asChild>
          <Link href="/admin/quotes?status=submitted">
            <FileText className="mr-2 h-4 w-4" />
            View Pending Quotes
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/admin/calendar">
            <Calendar className="mr-2 h-4 w-4" />
            Today&apos;s Schedule
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Quotes</CardTitle>
          <CardDescription>Latest quote requests from customers.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : recentQuotes.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">
              No quotes yet.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Quote ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentQuotes.map((quote) => (
                  <TableRow key={quote.id}>
                    <TableCell>
                      <Link
                        href={`/admin/quotes/${quote.id}`}
                        className="text-primary hover:underline font-medium"
                      >
                        {quote.quote_id}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {quote.first_name} {quote.last_name}
                    </TableCell>
                    <TableCell>{quote.address_city || '—'}</TableCell>
                    <TableCell>${quote.estimated_price}</TableCell>
                    <TableCell>
                      <StatusBadge status={quote.status} />
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {format(new Date(quote.created_at), 'MMM d, yyyy')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
