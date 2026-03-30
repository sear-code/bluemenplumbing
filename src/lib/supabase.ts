import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      service_categories: {
        Row: ServiceCategoryRow;
        Insert: ServiceCategoryInsert;
        Update: ServiceCategoryUpdate;
      };
      service_items: {
        Row: ServiceItemRow;
        Insert: ServiceItemInsert;
        Update: ServiceItemUpdate;
      };
      quotes: {
        Row: QuoteRow;
        Insert: QuoteInsert;
        Update: QuoteUpdate;
      };
    };
  };
}

export interface ServiceCategoryRow {
  id: string;
  name: string;
  description: string | null;
  category: 'repair' | 'installation' | 'kitchen' | 'bathroom' | 'unclog' | 'filter' | 'maintenance';
  price_range_min: number;
  price_range_max: number;
  estimated_duration: number;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ServiceCategoryInsert {
  id: string;
  name: string;
  description?: string | null;
  category: 'repair' | 'installation' | 'kitchen' | 'bathroom' | 'unclog' | 'filter' | 'maintenance';
  price_range_min?: number;
  price_range_max?: number;
  estimated_duration?: number;
  display_order?: number;
  is_active?: boolean;
}

export interface ServiceCategoryUpdate {
  id?: string;
  name?: string;
  description?: string | null;
  category?: 'repair' | 'installation' | 'kitchen' | 'bathroom' | 'unclog' | 'filter' | 'maintenance';
  price_range_min?: number;
  price_range_max?: number;
  estimated_duration?: number;
  display_order?: number;
  is_active?: boolean;
}

export interface ServiceItemRow {
  id: string;
  category_id: string;
  name: string;
  description: string | null;
  unit_price: number;
  price_min: number | null;
  price_max: number | null;
  parts_extra: boolean;
  parts_price: number;
  estimated_duration: number;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ServiceItemInsert {
  id: string;
  category_id: string;
  name: string;
  description?: string | null;
  unit_price: number;
  price_min?: number | null;
  price_max?: number | null;
  parts_extra?: boolean;
  parts_price?: number;
  estimated_duration?: number;
  display_order?: number;
  is_active?: boolean;
}

export interface ServiceItemUpdate {
  id?: string;
  category_id?: string;
  name?: string;
  description?: string | null;
  unit_price?: number;
  price_min?: number | null;
  price_max?: number | null;
  parts_extra?: boolean;
  parts_price?: number;
  estimated_duration?: number;
  display_order?: number;
  is_active?: boolean;
}

export interface QuoteRow {
  id: string;
  quote_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  property_type: string | null;
  address_street: string | null;
  address_city: string | null;
  address_state: string | null;
  address_zip: string | null;
  selected_services: string[];
  selected_categories: string[];
  custom_service: string | null;
  problem_description: string | null;
  urgency: string;
  estimated_price: number;
  estimated_duration: number;
  status: 'draft' | 'submitted' | 'contacted' | 'approved' | 'completed' | 'cancelled';
  access_notes: string | null;
  preferred_datetime: string | null;
  photos: string[];
  created_at: string;
  updated_at: string;
}

export interface QuoteInsert {
  quote_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  property_type?: string | null;
  address_street?: string | null;
  address_city?: string | null;
  address_state?: string | null;
  address_zip?: string | null;
  selected_services?: string[];
  selected_categories?: string[];
  custom_service?: string | null;
  problem_description?: string | null;
  urgency?: string;
  estimated_price?: number;
  estimated_duration?: number;
  status?: 'draft' | 'submitted' | 'contacted' | 'approved' | 'completed' | 'cancelled';
  access_notes?: string | null;
  preferred_datetime?: string | null;
  photos?: string[];
}

export interface QuoteUpdate {
  quote_id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  property_type?: string | null;
  address_street?: string | null;
  address_city?: string | null;
  address_state?: string | null;
  address_zip?: string | null;
  selected_services?: string[];
  selected_categories?: string[];
  custom_service?: string | null;
  problem_description?: string | null;
  urgency?: string;
  estimated_price?: number;
  estimated_duration?: number;
  status?: 'draft' | 'submitted' | 'contacted' | 'approved' | 'completed' | 'cancelled';
  access_notes?: string | null;
  preferred_datetime?: string | null;
  photos?: string[];
}

