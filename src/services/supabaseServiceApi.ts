import { supabase, ServiceCategoryRow, ServiceItemRow } from '@/lib/supabase';
import { ServiceCategory, ServiceItem } from '@/models/Quote';

/**
 * Fetch all active service categories with their items from Supabase
 */
export const fetchServiceCategories = async (): Promise<ServiceCategory[]> => {
  try {
    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.warn('Supabase not configured - environment variables missing');
      return [];
    }

    // Fetch categories
    const { data: categories, error: categoriesError } = await supabase
      .from('service_categories')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (categoriesError) {
      console.error('Error fetching categories:', categoriesError);
      // Return empty array instead of throwing to allow fallback
      return [];
    }

    if (!categories || categories.length === 0) {
      console.warn('No categories found in Supabase');
      return [];
    }

    // Fetch all items
    const { data: items, error: itemsError } = await supabase
      .from('service_items')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (itemsError) {
      console.error('Error fetching items:', itemsError);
      // Return empty array instead of throwing to allow fallback
      return [];
    }

    // Map database rows to application models
    const serviceCategories: ServiceCategory[] = categories.map((cat: ServiceCategoryRow) => {
      const categoryItems = items
        ?.filter((item: ServiceItemRow) => item.category_id === cat.id)
        .map((item: ServiceItemRow) => mapServiceItemRowToModel(item)) || [];

      return mapServiceCategoryRowToModel(cat, categoryItems);
    });

    console.log(`Successfully fetched ${serviceCategories.length} categories from Supabase`);
    return serviceCategories;
  } catch (error) {
    console.error('Error in fetchServiceCategories:', error);
    // Return empty array instead of throwing to allow fallback to local data
    return [];
  }
};

/**
 * Fetch a single category by ID with its items
 */
export const fetchCategoryById = async (categoryId: string): Promise<ServiceCategory | null> => {
  try {
    const { data: category, error: categoryError } = await supabase
      .from('service_categories')
      .select('*')
      .eq('id', categoryId)
      .eq('is_active', true)
      .single();

    if (categoryError || !category) {
      console.error('Error fetching category:', categoryError);
      return null;
    }

    const { data: items, error: itemsError } = await supabase
      .from('service_items')
      .select('*')
      .eq('category_id', categoryId)
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (itemsError) {
      console.error('Error fetching items:', itemsError);
      return null;
    }

    const categoryItems = items?.map((item: ServiceItemRow) => mapServiceItemRowToModel(item)) || [];
    return mapServiceCategoryRowToModel(category, categoryItems);
  } catch (error) {
    console.error('Error in fetchCategoryById:', error);
    return null;
  }
};

/**
 * Fetch a single service item by ID
 */
export const fetchServiceItemById = async (itemId: string): Promise<{ category: ServiceCategory; item: ServiceItem } | null> => {
  try {
    const { data: item, error: itemError } = await supabase
      .from('service_items')
      .select('*')
      .eq('id', itemId)
      .eq('is_active', true)
      .single();

    if (itemError || !item) {
      console.error('Error fetching item:', itemError);
      return null;
    }

    const category = await fetchCategoryById(item.category_id);
    if (!category) {
      return null;
    }

    return {
      category,
      item: mapServiceItemRowToModel(item),
    };
  } catch (error) {
    console.error('Error in fetchServiceItemById:', error);
    return null;
  }
};

/**
 * Calculate total price for selected service items
 * Uses a single query instead of N+1
 */
export const calculateTotalPriceFromSupabase = async (
  selectedItemIds: string[],
  urgency: string,
  propertyType: string
): Promise<number> => {
  try {
    if (selectedItemIds.length === 0) return 0;

    const { data: items, error } = await supabase
      .from('service_items')
      .select('unit_price')
      .in('id', selectedItemIds)
      .eq('is_active', true);

    if (error || !items) {
      console.error('Error fetching item prices:', error);
      return 0;
    }

    const baseTotal = items.reduce((sum, item) => sum + item.unit_price, 0);

    // Apply multipliers based on urgency and property type
    let multiplier = 1.0;

    if (urgency === 'emergency') multiplier += 0.5;
    else if (urgency === 'urgent') multiplier += 0.25;

    if (propertyType === 'commercial') multiplier += 0.3;

    return Math.round(baseTotal * multiplier);
  } catch (error) {
    console.error('Error calculating total price:', error);
    return 0;
  }
};

/**
 * Calculate total estimated duration
 * Uses a single query instead of N+1
 */
export const calculateTotalDurationFromSupabase = async (selectedItemIds: string[]): Promise<number> => {
  try {
    if (selectedItemIds.length === 0) return 0;

    const { data: items, error } = await supabase
      .from('service_items')
      .select('estimated_duration')
      .in('id', selectedItemIds)
      .eq('is_active', true);

    if (error || !items) {
      console.error('Error fetching item durations:', error);
      return 0;
    }

    return items.reduce((sum, item) => sum + item.estimated_duration, 0);
  } catch (error) {
    console.error('Error calculating total duration:', error);
    return 0;
  }
};

// Helper functions to map database rows to application models
const mapServiceCategoryRowToModel = (
  row: ServiceCategoryRow,
  items: ServiceItem[]
): ServiceCategory => {
  return {
    id: row.id,
    name: row.name,
    description: row.description || '',
    category: row.category,
    priceRangeMin: row.price_range_min,
    priceRangeMax: row.price_range_max,
    estimatedDuration: row.estimated_duration,
    items: items,
    displayOrder: row.display_order,
  };
};

const mapServiceItemRowToModel = (row: ServiceItemRow): ServiceItem => {
  return {
    id: row.id,
    name: row.name,
    description: row.description || undefined,
    unitPrice: row.unit_price,
    partsExtra: row.parts_extra,
    partsPrice: row.parts_price || undefined,
    estimatedDuration: row.estimated_duration,
    displayOrder: row.display_order,
  };
};

