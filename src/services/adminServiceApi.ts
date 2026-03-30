import { ServiceCategory, ServiceItem } from '@/models/Quote';

const ADMIN_API_BASE = '/api/admin/services';

const getAuthHeaders = (): HeadersInit => {
  const token = typeof window !== 'undefined'
    ? localStorage.getItem('admin_api_token') || ''
    : '';
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

const handleResponse = async (response: Response) => {
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Request failed');
  }
  return data;
};

export const fetchServices = async (): Promise<ServiceCategory[]> => {
  const [catRes, itemRes] = await Promise.all([
    fetch(`${ADMIN_API_BASE}/categories`, { headers: getAuthHeaders() }),
    fetch(`${ADMIN_API_BASE}/items`, { headers: getAuthHeaders() }),
  ]);

  const catData = await handleResponse(catRes);
  const itemData = await handleResponse(itemRes);

  const categories: ServiceCategory[] = (catData.data || []).map((cat: Record<string, unknown>) => ({
    id: cat.id as string,
    name: cat.name as string,
    description: (cat.description as string) || '',
    category: cat.category as string,
    priceRangeMin: cat.price_range_min as number,
    priceRangeMax: cat.price_range_max as number,
    estimatedDuration: cat.estimated_duration as number,
    displayOrder: cat.display_order as number,
    items: (itemData.data || [])
      .filter((item: Record<string, unknown>) => item.category_id === cat.id)
      .map((item: Record<string, unknown>) => ({
        id: item.id as string,
        name: item.name as string,
        description: (item.description as string) || undefined,
        unitPrice: item.unit_price as number,
        partsExtra: item.parts_extra as boolean,
        partsPrice: (item.parts_price as number) || undefined,
        estimatedDuration: item.estimated_duration as number,
        displayOrder: item.display_order as number,
      })),
  }));

  return categories;
};

export const createCategory = async (data: {
  name: string;
  description: string;
  category: 'repair' | 'installation' | 'kitchen' | 'bathroom' | 'unclog' | 'filter' | 'maintenance';
  priceRangeMin: number;
  priceRangeMax: number;
  estimatedDuration: number;
}): Promise<ServiceCategory> => {
  const response = await fetch(`${ADMIN_API_BASE}/categories`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      id: crypto.randomUUID(),
      name: data.name,
      description: data.description,
      category: data.category,
      price_range_min: data.priceRangeMin,
      price_range_max: data.priceRangeMax,
      estimated_duration: data.estimatedDuration,
    }),
  });

  const result = await handleResponse(response);
  const cat = result.data;

  return {
    id: cat.id,
    name: cat.name,
    description: cat.description || '',
    category: cat.category,
    priceRangeMin: cat.price_range_min,
    priceRangeMax: cat.price_range_max,
    estimatedDuration: cat.estimated_duration,
    items: [],
    displayOrder: cat.display_order,
  };
};

export const updateCategory = async (
  categoryId: string,
  data: {
    name: string;
    description: string;
    category: 'repair' | 'installation' | 'kitchen' | 'bathroom' | 'unclog' | 'filter' | 'maintenance';
    priceRangeMin: number;
    priceRangeMax: number;
    estimatedDuration: number;
  }
): Promise<ServiceCategory> => {
  const response = await fetch(`${ADMIN_API_BASE}/categories`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      id: categoryId,
      name: data.name,
      description: data.description,
      category: data.category,
      price_range_min: data.priceRangeMin,
      price_range_max: data.priceRangeMax,
      estimated_duration: data.estimatedDuration,
    }),
  });

  const result = await handleResponse(response);
  const cat = result.data;

  return {
    id: cat.id,
    name: cat.name,
    description: cat.description || '',
    category: cat.category,
    priceRangeMin: cat.price_range_min,
    priceRangeMax: cat.price_range_max,
    estimatedDuration: cat.estimated_duration,
    items: [],
    displayOrder: cat.display_order,
  };
};

export const deleteCategory = async (categoryId: string): Promise<void> => {
  const response = await fetch(`${ADMIN_API_BASE}/categories?id=${categoryId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  await handleResponse(response);
};

export const createItem = async (data: {
  categoryId: string;
  name: string;
  description?: string;
  unitPrice: number;
  partsExtra: boolean;
  estimatedDuration: number;
}): Promise<ServiceItem> => {
  const response = await fetch(`${ADMIN_API_BASE}/items`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      id: crypto.randomUUID(),
      category_id: data.categoryId,
      name: data.name,
      description: data.description || null,
      unit_price: data.unitPrice,
      parts_extra: data.partsExtra,
      estimated_duration: data.estimatedDuration,
    }),
  });

  const result = await handleResponse(response);
  const item = result.data;

  return {
    id: item.id,
    name: item.name,
    description: item.description || undefined,
    unitPrice: item.unit_price,
    partsExtra: item.parts_extra,
    estimatedDuration: item.estimated_duration,
    displayOrder: item.display_order,
  };
};

export const updateItem = async (
  itemId: string,
  data: {
    categoryId: string;
    name: string;
    description?: string;
    unitPrice: number;
    partsExtra: boolean;
    estimatedDuration: number;
  }
): Promise<ServiceItem> => {
  const response = await fetch(`${ADMIN_API_BASE}/items`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      id: itemId,
      category_id: data.categoryId,
      name: data.name,
      description: data.description || null,
      unit_price: data.unitPrice,
      parts_extra: data.partsExtra,
      estimated_duration: data.estimatedDuration,
    }),
  });

  const result = await handleResponse(response);
  const item = result.data;

  return {
    id: item.id,
    name: item.name,
    description: item.description || undefined,
    unitPrice: item.unit_price,
    partsExtra: item.parts_extra,
    estimatedDuration: item.estimated_duration,
    displayOrder: item.display_order,
  };
};

export const deleteItem = async (itemId: string): Promise<void> => {
  const response = await fetch(`${ADMIN_API_BASE}/items?id=${itemId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  await handleResponse(response);
};
