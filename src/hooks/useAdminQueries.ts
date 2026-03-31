'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchQuotes,
  fetchQuoteById,
  updateQuote,
  updateQuoteStatus,
  updateQuoteNotes,
  deleteQuote,
  type QuoteFilters,
} from '@/services/adminQuoteApi';
import {
  fetchSettings,
  updateSettings,
  fetchServiceAreas,
  createServiceArea,
  updateServiceArea,
  deleteServiceArea,
} from '@/services/adminSettingsApi';
import type { AdminSettingsData, ServiceAreaData } from '@/lib/validations/admin';

// Quotes
export function useAdminQuotes(filters: QuoteFilters = {}) {
  return useQuery({
    queryKey: ['admin-quotes', filters],
    queryFn: () => fetchQuotes(filters),
  });
}

export function useAdminQuote(id: string) {
  return useQuery({
    queryKey: ['admin-quote', id],
    queryFn: () => fetchQuoteById(id),
    enabled: !!id,
  });
}

export function useUpdateQuote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) =>
      updateQuote(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin-quotes'] });
      queryClient.invalidateQueries({ queryKey: ['admin-quote', variables.id] });
    },
  });
}

export function useUpdateQuoteStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status, notes }: { id: string; status: string; notes?: string }) =>
      updateQuoteStatus(id, status, notes),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin-quotes'] });
      queryClient.invalidateQueries({ queryKey: ['admin-quote', variables.id] });
    },
  });
}

export function useUpdateQuoteNotes() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      notes,
    }: {
      id: string;
      notes: { internal_notes?: string | null; technician_notes?: string | null };
    }) => updateQuoteNotes(id, notes),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin-quote', variables.id] });
    },
  });
}

export function useDeleteQuote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteQuote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-quotes'] });
    },
  });
}

// Dashboard stats
export function useAdminDashboardStats() {
  const today = useAdminQuotes({ dateRange: 'today', limit: 0 });
  const pending = useAdminQuotes({ status: 'submitted,contacted', limit: 0 });
  const completedWeek = useAdminQuotes({ status: 'completed', dateRange: 'week', limit: 0 });
  const completedMonth = useAdminQuotes({ status: 'completed', dateRange: 'month', limit: 0 });
  const recent = useAdminQuotes({ sort: 'newest', limit: 5 });

  return {
    newToday: today.data?.total ?? 0,
    pendingCount: pending.data?.total ?? 0,
    completedThisWeek: completedWeek.data?.total ?? 0,
    completedThisMonth: completedMonth.data?.total ?? 0,
    recentQuotes: recent.data?.data ?? [],
    isLoading: today.isLoading || pending.isLoading || completedWeek.isLoading || recent.isLoading,
  };
}

// Settings
export function useAdminSettings() {
  return useQuery({
    queryKey: ['admin-settings'],
    queryFn: fetchSettings,
  });
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AdminSettingsData) => updateSettings(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-settings'] });
    },
  });
}

// Service Areas
export function useServiceAreas() {
  return useQuery({
    queryKey: ['admin-service-areas'],
    queryFn: fetchServiceAreas,
  });
}

export function useCreateServiceArea() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ServiceAreaData) => createServiceArea(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-service-areas'] });
    },
  });
}

export function useUpdateServiceArea() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ServiceAreaData }) =>
      updateServiceArea(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-service-areas'] });
    },
  });
}

export function useDeleteServiceArea() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteServiceArea(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-service-areas'] });
    },
  });
}

// Scheduled quotes for calendar
export function useScheduledQuotes(month: number, year: number) {
  return useAdminQuotes({ hasSchedule: true, month, year });
}

export function useUnscheduledQuotes() {
  return useAdminQuotes({ hasSchedule: false, status: 'contacted,approved' });
}
