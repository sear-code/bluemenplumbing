'use client';

import { useState, useCallback } from 'react';
import { useAdminQuote, useUpdateQuote, useUpdateQuoteNotes, useDeleteQuote } from '@/hooks/useAdminQueries';
import { QuoteStatusPipeline } from './QuoteStatusPipeline';
import { QuoteEditDialog } from './QuoteEditDialog';
import { StatusBadge } from './StatusBadge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  ArrowLeft,
  Pencil,
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Clock,
  Loader2,
  Trash2,
  Wrench,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

export function QuoteDetail({ quoteId }: { quoteId: string }) {
  const { data: quote, isLoading } = useAdminQuote(quoteId);
  const updateQuote = useUpdateQuote();
  const updateNotes = useUpdateQuoteNotes();
  const deleteQuote = useDeleteQuote();
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);
  const [internalNotes, setInternalNotes] = useState<string | null>(null);
  const [techNotes, setTechNotes] = useState<string | null>(null);
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');

  // Initialize notes from quote data
  const effectiveInternalNotes = internalNotes ?? quote?.internal_notes ?? '';
  const effectiveTechNotes = techNotes ?? quote?.technician_notes ?? '';

  const handleSaveNotes = useCallback(() => {
    updateNotes.mutate(
      {
        id: quoteId,
        notes: {
          internal_notes: effectiveInternalNotes || null,
          technician_notes: effectiveTechNotes || null,
        },
      },
      {
        onSuccess: () => toast.success('Notes saved'),
        onError: (err) => toast.error(err.message),
      }
    );
  }, [quoteId, effectiveInternalNotes, effectiveTechNotes, updateNotes]);

  const handleSchedule = () => {
    if (!scheduleDate) {
      toast.error('Please select a date');
      return;
    }
    updateQuote.mutate(
      {
        id: quoteId,
        data: {
          scheduled_date: scheduleDate,
          scheduled_time: scheduleTime || null,
        },
      },
      {
        onSuccess: () => toast.success('Job scheduled'),
        onError: (err) => toast.error(err.message),
      }
    );
  };

  const handleDelete = () => {
    if (!confirm('Are you sure you want to permanently delete this quote? This cannot be undone.')) return;
    deleteQuote.mutate(quoteId, {
      onSuccess: () => {
        toast.success('Quote deleted');
        router.push('/admin/quotes');
      },
      onError: (err) => toast.error(err.message),
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  if (!quote) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">Quote not found.</p>
        <Button asChild variant="link" className="mt-2">
          <Link href="/admin/quotes">Back to quotes</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/quotes">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{quote.quote_id}</h1>
            <p className="text-sm text-muted-foreground">
              Created {format(new Date(quote.created_at), 'MMM d, yyyy h:mm a')}
            </p>
          </div>
          <StatusBadge status={quote.status} />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setEditOpen(true)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={deleteQuote.isPending}
          >
            {deleteQuote.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="mr-2 h-4 w-4" />
            )}
            Delete
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="status">Status & Scheduling</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <User className="h-4 w-4" /> Customer Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-3.5 w-3.5 text-muted-foreground" />
                  {quote.first_name} {quote.last_name}
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                  <a href={`mailto:${quote.email}`} className="text-primary hover:underline">
                    {quote.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                  <a href={`tel:${quote.phone}`} className="text-primary hover:underline">
                    {quote.phone}
                  </a>
                </div>
                {quote.address_street && (
                  <div className="flex items-start gap-2">
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground mt-0.5" />
                    <div>
                      {quote.address_street}
                      <br />
                      {quote.address_city}, {quote.address_state} {quote.address_zip}
                    </div>
                  </div>
                )}
                {quote.property_type && (
                  <Badge variant="secondary" className="mt-1">
                    {quote.property_type}
                  </Badge>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Price</span>
                  <span className="font-semibold">${quote.estimated_price}</span>
                </div>
                {quote.distance_fee ? (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Distance Fee ({quote.distance_km}km)
                    </span>
                    <span>${quote.distance_fee}</span>
                  </div>
                ) : null}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Urgency</span>
                  <Badge variant={quote.urgency === 'emergency' ? 'destructive' : 'secondary'}>
                    {quote.urgency}
                  </Badge>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span>{quote.estimated_duration} min</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Selected Services */}
          {(quote.resolved_services?.length > 0 || quote.resolved_categories?.length > 0) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Wrench className="h-4 w-4" /> Selected Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                {quote.resolved_categories?.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs text-muted-foreground mb-1.5">Categories</p>
                    <div className="flex flex-wrap gap-1.5">
                      {quote.resolved_categories.map((cat: { id: string; name: string }) => (
                        <Badge key={cat.id} variant="secondary">
                          {cat.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {quote.resolved_services?.length > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1.5">Services</p>
                    <div className="rounded-md border">
                      {quote.resolved_services.map(
                        (svc: { id: string; name: string; unitPrice: number }, i: number) => (
                          <div
                            key={svc.id}
                            className={`flex items-center justify-between px-3 py-2 text-sm ${
                              i > 0 ? 'border-t' : ''
                            }`}
                          >
                            <span>{svc.name}</span>
                            <span className="font-medium">${svc.unitPrice}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Additional Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {quote.problem_description && (
                <div>
                  <p className="text-muted-foreground mb-1">Problem Description</p>
                  <p>{quote.problem_description}</p>
                </div>
              )}
              {quote.custom_service && (
                <div>
                  <p className="text-muted-foreground mb-1">Custom Service Request</p>
                  <p className="bg-muted/50 rounded-md p-2">{quote.custom_service}</p>
                </div>
              )}
              {quote.access_notes && (
                <div>
                  <p className="text-muted-foreground mb-1">Access Notes</p>
                  <p>{quote.access_notes}</p>
                </div>
              )}
              {quote.preferred_datetime && (
                <div>
                  <p className="text-muted-foreground mb-1">Preferred Date/Time</p>
                  <p>{format(new Date(quote.preferred_datetime), 'MMM d, yyyy h:mm a')}</p>
                </div>
              )}
              {!quote.problem_description && !quote.custom_service && !quote.access_notes && !quote.preferred_datetime && (
                <p className="text-muted-foreground text-center py-2">No additional details.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Status & Scheduling Tab */}
        <TabsContent value="status" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Status Pipeline</CardTitle>
              <CardDescription>Move this quote through the workflow.</CardDescription>
            </CardHeader>
            <CardContent>
              <QuoteStatusPipeline quoteId={quoteId} currentStatus={quote.status} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="h-4 w-4" /> Schedule Job
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input
                    type="date"
                    value={scheduleDate || quote.scheduled_date || ''}
                    onChange={(e) => setScheduleDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Time</Label>
                  <Input
                    type="time"
                    value={scheduleTime || quote.scheduled_time || ''}
                    onChange={(e) => setScheduleTime(e.target.value)}
                  />
                </div>
              </div>
              {quote.scheduled_date && (
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  Currently scheduled: {format(new Date(quote.scheduled_date + 'T00:00:00'), 'MMM d, yyyy')}
                  {quote.scheduled_time && ` at ${quote.scheduled_time}`}
                </p>
              )}
              <Button size="sm" onClick={handleSchedule} disabled={updateQuote.isPending}>
                {updateQuote.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {quote.scheduled_date ? 'Reschedule' : 'Schedule'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notes Tab */}
        <TabsContent value="notes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Internal Notes</CardTitle>
              <CardDescription>Private notes about this quote.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                value={effectiveInternalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                placeholder="Add internal notes..."
                rows={4}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Technician Notes</CardTitle>
              <CardDescription>Notes for the technician on-site.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                value={effectiveTechNotes}
                onChange={(e) => setTechNotes(e.target.value)}
                placeholder="Add technician notes..."
                rows={4}
              />
            </CardContent>
          </Card>

          <Button onClick={handleSaveNotes} disabled={updateNotes.isPending}>
            {updateNotes.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Notes
          </Button>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Status History</CardTitle>
            </CardHeader>
            <CardContent>
              {quote.status_history?.length ? (
                <div className="space-y-3">
                  {quote.status_history.map(
                    (entry: {
                      id: string;
                      previous_status: string | null;
                      new_status: string;
                      notes: string | null;
                      created_at: string;
                    }) => (
                      <div key={entry.id} className="flex items-start gap-3 text-sm">
                        <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            {entry.previous_status && (
                              <>
                                <StatusBadge status={entry.previous_status} />
                                <span className="text-muted-foreground">→</span>
                              </>
                            )}
                            <StatusBadge status={entry.new_status} />
                          </div>
                          {entry.notes && (
                            <p className="text-muted-foreground mt-1">{entry.notes}</p>
                          )}
                          <p className="text-xs text-muted-foreground mt-1">
                            {format(new Date(entry.created_at), 'MMM d, yyyy h:mm a')}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground py-4 text-center">
                  No status changes recorded yet.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Dialog */}
      <QuoteEditDialog quote={quote} open={editOpen} onOpenChange={setEditOpen} />
    </div>
  );
}
