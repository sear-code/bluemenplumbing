import { createClient } from '@/lib/supabase/client';
import type { AdminSettingsRow, ServiceAreaRow } from '@/lib/supabase';
import type { AdminSettingsData, ServiceAreaData } from '@/lib/validations/admin';

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

// Admin Settings
export const fetchSettings = async (): Promise<AdminSettingsRow> => {
  const response = await fetch('/api/admin/settings', {
    headers: await getAuthHeaders(),
  });
  const result = await handleResponse(response);
  return result.data;
};

export const updateSettings = async (data: AdminSettingsData): Promise<AdminSettingsRow> => {
  const response = await fetch('/api/admin/settings', {
    method: 'PUT',
    headers: await getAuthHeaders(),
    body: JSON.stringify(data),
  });
  const result = await handleResponse(response);
  return result.data;
};

// Service Areas
export const fetchServiceAreas = async (): Promise<ServiceAreaRow[]> => {
  const response = await fetch('/api/admin/service-areas', {
    headers: await getAuthHeaders(),
  });
  const result = await handleResponse(response);
  return result.data;
};

export const createServiceArea = async (data: ServiceAreaData): Promise<ServiceAreaRow> => {
  const response = await fetch('/api/admin/service-areas', {
    method: 'POST',
    headers: await getAuthHeaders(),
    body: JSON.stringify(data),
  });
  const result = await handleResponse(response);
  return result.data;
};

export const updateServiceArea = async (id: string, data: ServiceAreaData): Promise<ServiceAreaRow> => {
  const response = await fetch('/api/admin/service-areas', {
    method: 'PUT',
    headers: await getAuthHeaders(),
    body: JSON.stringify({ id, ...data }),
  });
  const result = await handleResponse(response);
  return result.data;
};

export const deleteServiceArea = async (id: string): Promise<void> => {
  const response = await fetch(`/api/admin/service-areas?id=${id}`, {
    method: 'DELETE',
    headers: await getAuthHeaders(),
  });
  await handleResponse(response);
};
