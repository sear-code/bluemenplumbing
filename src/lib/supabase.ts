import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables — Supabase client will not be available');
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

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
      admin_settings: {
        Row: AdminSettingsRow;
        Insert: AdminSettingsInsert;
        Update: AdminSettingsUpdate;
      };
      service_areas: {
        Row: ServiceAreaRow;
        Insert: ServiceAreaInsert;
        Update: ServiceAreaUpdate;
      };
      quote_status_history: {
        Row: QuoteStatusHistoryRow;
        Insert: QuoteStatusHistoryInsert;
        Update: QuoteStatusHistoryUpdate;
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

export interface AdminSettingsRow {
  id: string;
  markup_percentage: number;
  emergency_fee: number;
  travel_rate_per_km: number;
  max_service_radius_km: number;
  created_at: string;
  updated_at: string;
}

export interface AdminSettingsInsert {
  id?: string;
  markup_percentage?: number;
  emergency_fee?: number;
  travel_rate_per_km?: number;
  max_service_radius_km?: number;
}

export interface AdminSettingsUpdate {
  markup_percentage?: number;
  emergency_fee?: number;
  travel_rate_per_km?: number;
  max_service_radius_km?: number;
}

export interface ServiceAreaRow {
  id: string;
  city_name: string;
  zone: 'core' | 'extended';
  distance_km: number;
  nearest_core_city: string | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface ServiceAreaInsert {
  city_name: string;
  zone: 'core' | 'extended';
  distance_km?: number;
  nearest_core_city?: string | null;
  is_active?: boolean;
  display_order?: number;
}

export interface ServiceAreaUpdate {
  city_name?: string;
  zone?: 'core' | 'extended';
  distance_km?: number;
  nearest_core_city?: string | null;
  is_active?: boolean;
  display_order?: number;
}

export interface QuoteStatusHistoryRow {
  id: string;
  quote_id: string;
  previous_status: string | null;
  new_status: string;
  changed_by: string;
  notes: string | null;
  created_at: string;
}

export interface QuoteStatusHistoryInsert {
  quote_id: string;
  previous_status?: string | null;
  new_status: string;
  changed_by?: string;
  notes?: string | null;
}

export interface QuoteStatusHistoryUpdate {
  notes?: string | null;
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
  distance_fee: number | null;
  distance_km: number | null;
  status: 'draft' | 'submitted' | 'contacted' | 'approved' | 'completed' | 'cancelled';
  access_notes: string | null;
  preferred_datetime: string | null;
  photos: string[];
  scheduled_date: string | null;
  scheduled_time: string | null;
  internal_notes: string | null;
  technician_notes: string | null;
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
  distance_fee?: number | null;
  distance_km?: number | null;
  status?: 'draft' | 'submitted' | 'contacted' | 'approved' | 'completed' | 'cancelled';
  access_notes?: string | null;
  preferred_datetime?: string | null;
  photos?: string[];
  scheduled_date?: string | null;
  scheduled_time?: string | null;
  internal_notes?: string | null;
  technician_notes?: string | null;
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
  distance_fee?: number | null;
  distance_km?: number | null;
  status?: 'draft' | 'submitted' | 'contacted' | 'approved' | 'completed' | 'cancelled';
  access_notes?: string | null;
  preferred_datetime?: string | null;
  photos?: string[];
  scheduled_date?: string | null;
  scheduled_time?: string | null;
  internal_notes?: string | null;
  technician_notes?: string | null;
}

