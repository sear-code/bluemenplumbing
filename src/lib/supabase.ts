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
    };
  };
}

export interface ServiceCategoryRow {
  id: string;
  name: string;
  description: string | null;
  category: 'rough-in' | 'finishing' | 'kitchen' | 'laundry' | 'repair' | 'maintenance';
  icon: string | null;
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
  category: 'rough-in' | 'finishing' | 'kitchen' | 'laundry' | 'repair' | 'maintenance';
  icon?: string | null;
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
  category?: 'rough-in' | 'finishing' | 'kitchen' | 'laundry' | 'repair' | 'maintenance';
  icon?: string | null;
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
  parts_extra?: boolean;
  parts_price?: number;
  estimated_duration?: number;
  display_order?: number;
  is_active?: boolean;
}

