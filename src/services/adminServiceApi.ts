import { ServiceCategory, ServiceItem } from '@/models/Quote';
import { serviceCategories as initialServiceCategories } from './serviceData';

let cachedCategories: ServiceCategory[] = [...initialServiceCategories];

const STORAGE_KEY = 'bluemen_service_categories';

const loadFromStorage = (): ServiceCategory[] => {
  if (typeof window === 'undefined') return cachedCategories;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      cachedCategories = parsed;
      return parsed;
    }
  } catch (error) {
    console.error('Error loading from storage:', error);
  }
  return cachedCategories;
};

const saveToStorage = (categories: ServiceCategory[]) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
    cachedCategories = categories;
  } catch (error) {
    console.error('Error saving to storage:', error);
  }
};

export const fetchServices = async (): Promise<ServiceCategory[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return loadFromStorage();
};

export const createCategory = async (data: {
  name: string;
  description: string;
  priceRangeMin: number;
  priceRangeMax: number;
  estimatedDuration: number;
}): Promise<ServiceCategory> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const categories = loadFromStorage();
  const newCategory: ServiceCategory = {
    id: `category-${Date.now()}`,
    name: data.name,
    description: data.description,
    priceRangeMin: data.priceRangeMin,
    priceRangeMax: data.priceRangeMax,
    estimatedDuration: data.estimatedDuration,
    items: [],
    displayOrder: categories.length + 1,
  };
  
  const updatedCategories = [...categories, newCategory];
  saveToStorage(updatedCategories);
  
  return newCategory;
};

export const updateCategory = async (
  categoryId: string,
  data: {
    name: string;
    description: string;
    priceRangeMin: number;
    priceRangeMax: number;
    estimatedDuration: number;
  }
): Promise<ServiceCategory> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const categories = loadFromStorage();
  const categoryIndex = categories.findIndex(cat => cat.id === categoryId);
  
  if (categoryIndex === -1) {
    throw new Error('Category not found');
  }
  
  const updatedCategory: ServiceCategory = {
    ...categories[categoryIndex],
    name: data.name,
    description: data.description,
    priceRangeMin: data.priceRangeMin,
    priceRangeMax: data.priceRangeMax,
    estimatedDuration: data.estimatedDuration,
  };
  
  const updatedCategories = [...categories];
  updatedCategories[categoryIndex] = updatedCategory;
  saveToStorage(updatedCategories);
  
  return updatedCategory;
};

export const deleteCategory = async (categoryId: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const categories = loadFromStorage();
  const updatedCategories = categories.filter(cat => cat.id !== categoryId);
  saveToStorage(updatedCategories);
};

export const createItem = async (data: {
  categoryId: string;
  name: string;
  description?: string;
  unitPrice: number;
  partsExtra: boolean;
  estimatedDuration: number;
}): Promise<ServiceItem> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const categories = loadFromStorage();
  const categoryIndex = categories.findIndex(cat => cat.id === data.categoryId);
  
  if (categoryIndex === -1) {
    throw new Error('Category not found');
  }
  
  const newItem: ServiceItem = {
    id: `item-${Date.now()}`,
    name: data.name,
    description: data.description,
    unitPrice: data.unitPrice,
    partsExtra: data.partsExtra,
    estimatedDuration: data.estimatedDuration,
    displayOrder: categories[categoryIndex].items.length + 1,
  };
  
  const updatedCategories = [...categories];
  updatedCategories[categoryIndex] = {
    ...updatedCategories[categoryIndex],
    items: [...updatedCategories[categoryIndex].items, newItem],
  };
  
  saveToStorage(updatedCategories);
  
  return newItem;
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
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const categories = loadFromStorage();
  
  let oldCategoryIndex = -1;
  let itemIndex = -1;
  
  for (let i = 0; i < categories.length; i++) {
    const idx = categories[i].items.findIndex(item => item.id === itemId);
    if (idx !== -1) {
      oldCategoryIndex = i;
      itemIndex = idx;
      break;
    }
  }
  
  if (oldCategoryIndex === -1 || itemIndex === -1) {
    throw new Error('Item not found');
  }
  
  const updatedItem: ServiceItem = {
    ...categories[oldCategoryIndex].items[itemIndex],
    name: data.name,
    description: data.description,
    unitPrice: data.unitPrice,
    partsExtra: data.partsExtra,
    estimatedDuration: data.estimatedDuration,
  };
  
  const updatedCategories = [...categories];
  
  if (categories[oldCategoryIndex].id === data.categoryId) {
    updatedCategories[oldCategoryIndex] = {
      ...updatedCategories[oldCategoryIndex],
      items: [
        ...updatedCategories[oldCategoryIndex].items.slice(0, itemIndex),
        updatedItem,
        ...updatedCategories[oldCategoryIndex].items.slice(itemIndex + 1),
      ],
    };
  } else {
    const newCategoryIndex = categories.findIndex(cat => cat.id === data.categoryId);
    if (newCategoryIndex === -1) {
      throw new Error('Target category not found');
    }
    
    updatedCategories[oldCategoryIndex] = {
      ...updatedCategories[oldCategoryIndex],
      items: updatedCategories[oldCategoryIndex].items.filter(item => item.id !== itemId),
    };
    
    updatedCategories[newCategoryIndex] = {
      ...updatedCategories[newCategoryIndex],
      items: [...updatedCategories[newCategoryIndex].items, updatedItem],
    };
  }
  
  saveToStorage(updatedCategories);
  
  return updatedItem;
};

export const deleteItem = async (itemId: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const categories = loadFromStorage();
  
  const updatedCategories = categories.map(category => ({
    ...category,
    items: category.items.filter(item => item.id !== itemId),
  }));
  
  saveToStorage(updatedCategories);
};

