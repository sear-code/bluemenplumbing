'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useScheduledQuotes, useUnscheduledQuotes } from '@/hooks/useAdminQueries';
import { StatusBadge } from './StatusBadge';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Clock, MapPin } from 'lucide-react';
import { format, isSameDay } from 'date-fns';
import type { QuoteRow } from '@/lib/supabase';

export function ScheduleCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [month, setMonth] = useState(new Date());

  const { data: scheduledData, isLoading: scheduledLoading } = useScheduledQuotes(
    month.getMonth() + 1,
    month.getFullYear()
  );
  const { data: unscheduledData, isLoading: unscheduledLoading } = useUnscheduledQuotes();

  const scheduledQuotes = scheduledData?.data || [];
  const unscheduledQuotes = unscheduledData?.data || [];

  // Get quotes for selected day
  const dayQuotes = scheduledQuotes.filter((q) =>
    q.scheduled_date
      ? isSameDay(new Date(q.scheduled_date + 'T00:00:00'), selectedDate)
      : false
  );

  // Dates that have scheduled quotes (for highlighting)
  const scheduledDates = scheduledQuotes
    .filter((q) => q.scheduled_date)
    .map((q) => new Date(q.scheduled_date + 'T00:00:00'));

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[auto_1fr]">
        {/* Calendar */}
        <Card>
          <CardContent className="pt-6">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              month={month}
              onMonthChange={setMonth}
              modifiers={{
                scheduled: scheduledDates,
              }}
              modifiersStyles={{
                scheduled: {
                  fontWeight: 'bold',
                  textDecoration: 'underline',
                  textDecorationColor: 'hsl(var(--primary))',
                  textUnderlineOffset: '4px',
                },
              }}
            />
          </CardContent>
        </Card>

        {/* Day Detail */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              {format(selectedDate, 'EEEE, MMMM d, yyyy')}
            </CardTitle>
            <CardDescription>
              {dayQuotes.length} job{dayQuotes.length !== 1 ? 's' : ''} scheduled
            </CardDescription>
          </CardHeader>
          <CardContent>
            {scheduledLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : dayQuotes.length === 0 ? (
              <p className="text-sm text-muted-foreground py-8 text-center">
                No jobs scheduled for this day.
              </p>
            ) : (
              <div className="space-y-3">
                {dayQuotes
                  .sort((a, b) => (a.scheduled_time || '').localeCompare(b.scheduled_time || ''))
                  .map((quote) => (
                    <Link
                      key={quote.id}
                      href={`/admin/quotes/${quote.id}`}
                      className="block rounded-lg border p-3 hover:bg-accent transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">
                          {quote.first_name} {quote.last_name}
                        </span>
                        <StatusBadge status={quote.status} />
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        {quote.scheduled_time && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {quote.scheduled_time}
                          </span>
                        )}
                        {quote.address_city && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {quote.address_city}
                          </span>
                        )}
                        <Badge variant="secondary" className="text-xs">
                          ${quote.estimated_price}
                        </Badge>
                      </div>
                    </Link>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Unscheduled Quotes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Unscheduled Quotes</CardTitle>
          <CardDescription>
            Contacted or approved quotes that need to be scheduled.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {unscheduledLoading ? (
            <Skeleton className="h-32 w-full" />
          ) : unscheduledQuotes.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">
              All quotes are scheduled.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Quote ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {unscheduledQuotes.map((quote: QuoteRow) => (
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
                    <TableCell>
                      <StatusBadge status={quote.status} />
                    </TableCell>
                    <TableCell>${quote.estimated_price}</TableCell>
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
