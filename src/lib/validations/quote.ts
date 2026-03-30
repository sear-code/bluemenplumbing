import { z } from 'zod';

const stripHtml = (str: string) => str.replace(/<[^>]*>/g, '');

export const quoteSubmissionSchema = z.object({
  customerInfo: z.object({
    firstName: z
      .string()
      .min(1, 'First name is required')
      .max(100, 'First name is too long')
      .transform((v) => stripHtml(v.trim())),
    lastName: z
      .string()
      .min(1, 'Last name is required')
      .max(100, 'Last name is too long')
      .transform((v) => stripHtml(v.trim())),
    email: z.string().email('Invalid email address').max(254),
    phone: z
      .string()
      .min(10, 'Phone number must be at least 10 digits')
      .max(15, 'Phone number is too long')
      .regex(/^[\d\s()+-]+$/, 'Invalid phone number format'),
  }),
  propertyType: z
    .enum(['house', 'apartment', 'condo', 'commercial', 'other'])
    .optional()
    .nullable(),
  address: z
    .object({
      street: z
        .string()
        .max(200)
        .transform((v) => stripHtml(v.trim()))
        .optional()
        .nullable(),
      city: z
        .string()
        .max(100)
        .transform((v) => stripHtml(v.trim()))
        .optional()
        .nullable(),
      state: z
        .string()
        .max(100)
        .transform((v) => stripHtml(v.trim()))
        .optional()
        .nullable(),
      zipCode: z
        .string()
        .max(10)
        .optional()
        .nullable(),
    })
    .optional()
    .nullable(),
  selectedServices: z.array(z.string().max(200)).default([]),
  selectedCategories: z.array(z.string().max(200)).default([]),
  customService: z
    .string()
    .max(500)
    .transform((v) => stripHtml(v.trim()))
    .optional()
    .nullable(),
  problemDescription: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(2000, 'Description is too long')
    .transform((v) => stripHtml(v.trim()))
    .optional()
    .nullable(),
  urgency: z.enum(['standard', 'urgent', 'emergency']).default('standard'),
  estimatedPrice: z.number().min(0).max(100000).default(0),
  estimatedDuration: z.number().min(0).max(10000).default(120),
  distanceFee: z.number().min(0).max(1000).optional().nullable(),
  distanceKm: z.number().min(0).max(1000).optional().nullable(),
  accessNotes: z
    .string()
    .max(1000)
    .transform((v) => stripHtml(v.trim()))
    .optional()
    .nullable(),
  preferredDateTime: z.string().optional().nullable(),
  photos: z.array(z.string().url()).max(10).default([]),
});

export type QuoteSubmission = z.infer<typeof quoteSubmissionSchema>;
