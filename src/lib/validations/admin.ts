import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Valid email required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const adminSettingsSchema = z.object({
  markup_percentage: z.number().min(0).max(100),
  emergency_fee: z.number().min(0).max(10000),
  travel_rate_per_km: z.number().min(0).max(100),
  max_service_radius_km: z.number().min(0).max(500),
});

export const quoteUpdateSchema = z.object({
  first_name: z.string().min(1).max(100).optional(),
  last_name: z.string().min(1).max(100).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(10).max(15).optional(),
  estimated_price: z.number().min(0).optional(),
  distance_fee: z.number().min(0).optional(),
  scheduled_date: z.string().optional().nullable(),
  scheduled_time: z.string().optional().nullable(),
  internal_notes: z.string().max(5000).optional().nullable(),
  technician_notes: z.string().max(5000).optional().nullable(),
  status: z.enum(['draft', 'submitted', 'contacted', 'approved', 'completed', 'cancelled']).optional(),
});

export const quoteStatusUpdateSchema = z.object({
  status: z.enum(['draft', 'submitted', 'contacted', 'approved', 'completed', 'cancelled']),
  notes: z.string().max(1000).optional(),
});

export const serviceAreaSchema = z.object({
  city_name: z.string().min(1).max(100),
  zone: z.enum(['core', 'extended']),
  distance_km: z.number().min(0).max(500),
  nearest_core_city: z.string().max(100).optional().nullable(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type AdminSettingsData = z.infer<typeof adminSettingsSchema>;
export type QuoteUpdateData = z.infer<typeof quoteUpdateSchema>;
export type QuoteStatusUpdateData = z.infer<typeof quoteStatusUpdateSchema>;
export type ServiceAreaData = z.infer<typeof serviceAreaSchema>;
