import { z } from 'zod';

const serviceCategoryTypes = [
  'repair',
  'installation',
  'kitchen',
  'bathroom',
  'unclog',
  'filter',
  'maintenance',
] as const;

export const serviceCategoryCreateSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Name is required').max(200),
  description: z.string().max(1000).optional().nullable(),
  category: z.enum(serviceCategoryTypes),
  price_range_min: z.number().min(0).max(100000).optional(),
  price_range_max: z.number().min(0).max(100000).optional(),
  estimated_duration: z.number().min(0).max(10000).optional(),
  display_order: z.number().int().min(0).optional(),
  is_active: z.boolean().optional(),
});

export const serviceCategoryUpdateSchema = z.object({
  id: z.string().uuid('Category ID is required'),
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional().nullable(),
  category: z.enum(serviceCategoryTypes).optional(),
  price_range_min: z.number().min(0).max(100000).optional(),
  price_range_max: z.number().min(0).max(100000).optional(),
  estimated_duration: z.number().min(0).max(10000).optional(),
  display_order: z.number().int().min(0).optional(),
  is_active: z.boolean().optional(),
});

export const serviceItemCreateSchema = z.object({
  id: z.string().uuid(),
  category_id: z.string().uuid('Category ID is required'),
  name: z.string().min(1, 'Name is required').max(200),
  description: z.string().max(1000).optional().nullable(),
  unit_price: z.number().min(0, 'Price must be positive').max(100000),
  price_min: z.number().min(0).max(100000).optional().nullable(),
  price_max: z.number().min(0).max(100000).optional().nullable(),
  parts_extra: z.boolean().optional(),
  parts_price: z.number().min(0).max(100000).optional(),
  estimated_duration: z.number().min(0).max(10000).optional(),
  display_order: z.number().int().min(0).optional(),
  is_active: z.boolean().optional(),
});

export const serviceItemUpdateSchema = z.object({
  id: z.string().uuid('Item ID is required'),
  category_id: z.string().uuid().optional(),
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional().nullable(),
  unit_price: z.number().min(0).max(100000).optional(),
  price_min: z.number().min(0).max(100000).optional().nullable(),
  price_max: z.number().min(0).max(100000).optional().nullable(),
  parts_extra: z.boolean().optional(),
  parts_price: z.number().min(0).max(100000).optional(),
  estimated_duration: z.number().min(0).max(10000).optional(),
  display_order: z.number().int().min(0).optional(),
  is_active: z.boolean().optional(),
});
