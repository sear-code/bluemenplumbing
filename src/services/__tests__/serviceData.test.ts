import { describe, it, expect } from 'vitest';
import {
  getServiceCategories,
  getCategoryById,
  getServiceItemById,
  calculateTotalPrice,
  calculateTotalDuration,
} from '../serviceData';

describe('serviceData', () => {
  describe('getServiceCategories', () => {
    it('returns all service categories', () => {
      const categories = getServiceCategories();
      expect(categories.length).toBeGreaterThan(0);
      expect(categories[0]).toHaveProperty('id');
      expect(categories[0]).toHaveProperty('name');
      expect(categories[0]).toHaveProperty('items');
    });

    it('categories are sorted by display order', () => {
      const categories = getServiceCategories();
      for (let i = 1; i < categories.length; i++) {
        expect(categories[i].displayOrder).toBeGreaterThanOrEqual(
          categories[i - 1].displayOrder
        );
      }
    });
  });

  describe('getCategoryById', () => {
    it('returns a category when given valid ID', () => {
      const category = getCategoryById('bathroom-rough-in');
      expect(category).toBeDefined();
      expect(category?.name).toBeTruthy();
    });

    it('returns undefined for invalid ID', () => {
      const category = getCategoryById('nonexistent');
      expect(category).toBeUndefined();
    });
  });

  describe('getServiceItemById', () => {
    it('returns an item with its category when given valid ID', () => {
      const categories = getServiceCategories();
      const firstItem = categories[0].items[0];
      const found = getServiceItemById(firstItem.id);
      expect(found).toBeDefined();
      expect(found?.item.name).toBe(firstItem.name);
      expect(found?.category.id).toBe(categories[0].id);
    });

    it('returns undefined for invalid ID', () => {
      const result = getServiceItemById('nonexistent');
      expect(result).toBeUndefined();
    });
  });

  describe('calculateTotalPrice', () => {
    it('returns 0 for empty selection', () => {
      const price = calculateTotalPrice([], 'standard', 'house');
      expect(price).toBe(0);
    });

    it('calculates base price for standard urgency', () => {
      const categories = getServiceCategories();
      const itemIds = [categories[0].items[0].id];
      const price = calculateTotalPrice(itemIds, 'standard', 'house');
      expect(price).toBeGreaterThan(0);
    });

    it('applies emergency multiplier (+50%)', () => {
      const categories = getServiceCategories();
      const itemIds = [categories[0].items[0].id];
      const standardPrice = calculateTotalPrice(itemIds, 'standard', 'house');
      const emergencyPrice = calculateTotalPrice(itemIds, 'emergency', 'house');
      expect(emergencyPrice).toBe(Math.round(standardPrice * 1.5));
    });

    it('applies urgent multiplier (+25%)', () => {
      const categories = getServiceCategories();
      const itemIds = [categories[0].items[0].id];
      const standardPrice = calculateTotalPrice(itemIds, 'standard', 'house');
      const urgentPrice = calculateTotalPrice(itemIds, 'urgent', 'house');
      expect(urgentPrice).toBe(Math.round(standardPrice * 1.25));
    });

    it('applies commercial multiplier (+30%)', () => {
      const categories = getServiceCategories();
      const itemIds = [categories[0].items[0].id];
      const housePrice = calculateTotalPrice(itemIds, 'standard', 'house');
      const commercialPrice = calculateTotalPrice(itemIds, 'standard', 'commercial');
      expect(commercialPrice).toBe(Math.round(housePrice * 1.3));
    });

    it('stacks emergency + commercial multipliers', () => {
      const categories = getServiceCategories();
      const itemIds = [categories[0].items[0].id];
      const basePrice = calculateTotalPrice(itemIds, 'standard', 'house');
      const stackedPrice = calculateTotalPrice(itemIds, 'emergency', 'commercial');
      // emergency: +0.5, commercial: +0.3, total multiplier: 1.8
      expect(stackedPrice).toBe(Math.round(basePrice * 1.8));
    });

    it('sums prices across multiple items', () => {
      const categories = getServiceCategories();
      const item1 = categories[0].items[0];
      const item2 = categories[0].items[1];
      if (!item2) return; // skip if only 1 item in category

      const price1 = calculateTotalPrice([item1.id], 'standard', 'house');
      const price2 = calculateTotalPrice([item2.id], 'standard', 'house');
      const combined = calculateTotalPrice([item1.id, item2.id], 'standard', 'house');
      expect(combined).toBe(price1 + price2);
    });
  });

  describe('calculateTotalDuration', () => {
    it('returns 0 for empty selection', () => {
      const duration = calculateTotalDuration([]);
      expect(duration).toBe(0);
    });

    it('returns duration for single item', () => {
      const categories = getServiceCategories();
      const item = categories[0].items[0];
      const duration = calculateTotalDuration([item.id]);
      expect(duration).toBe(item.estimatedDuration);
    });

    it('sums durations across multiple items', () => {
      const categories = getServiceCategories();
      const item1 = categories[0].items[0];
      const item2 = categories[0].items[1];
      if (!item2) return;

      const combined = calculateTotalDuration([item1.id, item2.id]);
      expect(combined).toBe(item1.estimatedDuration + item2.estimatedDuration);
    });
  });
});
