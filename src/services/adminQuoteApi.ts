import { createClient } from '@/lib/supabase/client';
import type { QuoteRow } from '@/lib/supabase';

const getAuthHeaders = async (): Promise<HeadersInit> => {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${session?.access_token || ''}`,
  };
};

const handleResponse = async (response: Response) => {
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Request failed');
  }
  return data;
};

export interface QuoteFilters {
  status?: string;
  search?: string;
  city?: string;
  dateRange?: string;
  sort?: string;
  hasSchedule?: boolean;
  month?: number;
  year?: number;
  limit?: number;
  offset?: number;
}

export interface QuotesResponse {
  data: QuoteRow[];
  total: number;
  limit: number;
  offset: number;
}

export const fetchQuotes = async (filters: QuoteFilters = {}): Promise<QuotesResponse> => {
  const params = new URLSearchParams();
  if (filters.status) params.set('status', filters.status);
  if (filters.search) params.set('search', filters.search);
  if (filters.city) params.set('city', filters.city);
  if (filters.dateRange) params.set('dateRange', filters.dateRange);
  if (filters.sort) params.set('sort', filters.sort);
  if (filters.hasSchedule !== undefined) params.set('has_schedule', String(filters.hasSchedule));
  if (filters.month) params.set('month', String(filters.month));
  if (filters.year) params.set('year', String(filters.year));
  if (filters.limit) params.set('limit', String(filters.limit));
  if (filters.offset) params.set('offset', String(filters.offset));

  const response = await fetch(`/api/admin/quotes?${params}`, {
    headers: await getAuthHeaders(),
  });

  const result = await handleResponse(response);
  return { data: result.data, total: result.total, limit: result.limit, offset: result.offset };
};

export const fetchQuoteById = async (id: string) => {
  const response = await fetch(`/api/admin/quotes/${id}`, {
    headers: await getAuthHeaders(),
  });
  const result = await handleResponse(response);
  return result.data;
};

export const updateQuote = async (id: string, data: Record<string, unknown>) => {
  const response = await fetch(`/api/admin/quotes/${id}`, {
    method: 'PUT',
    headers: await getAuthHeaders(),
    body: JSON.stringify(data),
  });
  const result = await handleResponse(response);
  return result.data;
};

export const updateQuoteStatus = async (id: string, status: string, notes?: string) => {
  const response = await fetch(`/api/admin/quotes/${id}/status`, {
    method: 'PUT',
    headers: await getAuthHeaders(),
    body: JSON.stringify({ status, notes }),
  });
  const result = await handleResponse(response);
  return result.data;
};

export const updateQuoteNotes = async (
  id: string,
  notes: { internal_notes?: string | null; technician_notes?: string | null }
) => {
  const response = await fetch(`/api/admin/quotes/${id}/notes`, {
    method: 'PUT',
    headers: await getAuthHeaders(),
    body: JSON.stringify(notes),
  });
  const result = await handleResponse(response);
  return result.data;
};
