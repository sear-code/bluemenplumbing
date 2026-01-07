import { supabase, ServiceCategoryRow, ServiceItemRow } from '@/lib/supabase';
import { ServiceCategory, ServiceItem } from '@/models/Quote';

/**
 * Fetch all active service categories with their items from Supabase
 */
export const fetchServiceCategories = async (): Promise<ServiceCategory[]> => {
  try {
    // Fetch categories
    const { data: categories, error: categoriesError } = await supabase
      .from('service_categories')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (categoriesError) {
      console.error('Error fetching categories:', categoriesError);
      throw new Error('Failed to fetch service categories');
    }

    if (!categories || categories.length === 0) {
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
      throw new Error('Failed to fetch service items');
    }

    // Map database rows to application models
    const serviceCategories: ServiceCategory[] = categories.map((cat: ServiceCategoryRow) => {
      const categoryItems = items
        ?.filter((item: ServiceItemRow) => item.category_id === cat.id)
        .map((item: ServiceItemRow) => mapServiceItemRowToModel(item)) || [];

      return mapServiceCategoryRowToModel(cat, categoryItems);
    });

    return serviceCategories;
  } catch (error) {
    console.error('Error in fetchServiceCategories:', error);
    throw error;
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
 */
export const calculateTotalPriceFromSupabase = async (
  selectedItemIds: string[],
  urgency: string,
  propertyType: string
): Promise<number> => {
  try {
    let baseTotal = 0;

    // Fetch all selected items
    for (const itemId of selectedItemIds) {
      const { data: item, error } = await supabase
        .from('service_items')
        .select('unit_price')
        .eq('id', itemId)
        .eq('is_active', true)
        .single();

      if (!error && item) {
        baseTotal += item.unit_price;
      }
    }

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
 */
export const calculateTotalDurationFromSupabase = async (selectedItemIds: string[]): Promise<number> => {
  try {
    let totalDuration = 0;

    // Fetch all selected items
    for (const itemId of selectedItemIds) {
      const { data: item, error } = await supabase
        .from('service_items')
        .select('estimated_duration')
        .eq('id', itemId)
        .eq('is_active', true)
        .single();

      if (!error && item) {
        totalDuration += item.estimated_duration;
      }
    }

    return totalDuration;
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
    icon: row.icon || '',
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

