import { ServiceCategory, ServiceItem } from '@/models/Quote';
import { applyPriceMarkup } from '@/lib/utils';
import { EMERGENCY_FEE } from '@/lib/constants';

/**
 * Two-tier service structure with categories and items
 * Based on Blue Men Plumbing actual price list
 * Prices are base values — 20% markup is applied at display time
 */
export const serviceCategories: ServiceCategory[] = [
  {
    id: 'leak-repairs',
    name: 'Leak Repairs',
    description: 'Got a drip or a puddle? We\'ll find and fix it.',
    category: 'repair',
    priceRangeMin: 79,
    priceRangeMax: 250,
    estimatedDuration: 60,
    displayOrder: 1,
    items: [
      {
        id: 'leak-kitchen',
        name: 'Kitchen Leak',
        unitPrice: 79,
        partsExtra: false,
        estimatedDuration: 60,
        displayOrder: 1,
      },
      {
        id: 'leak-bathroom-vanity',
        name: 'Bathroom Vanity Leak',
        unitPrice: 79,
        partsExtra: false,
        estimatedDuration: 60,
        displayOrder: 2,
      },
      {
        id: 'leak-toilet-external',
        name: 'Toilet Leak - External',
        description: 'Outside of the toilet or under',
        unitPrice: 79,
        partsExtra: false,
        estimatedDuration: 60,
        displayOrder: 3,
      },
      {
        id: 'leak-toilet-internal',
        name: 'Toilet Leak - Internal',
        description: 'Inside the toilet',
        unitPrice: 79,
        partsExtra: false,
        estimatedDuration: 60,
        displayOrder: 4,
      },
      {
        id: 'leak-shower-faucet',
        name: 'Shower Faucet Leak',
        unitPrice: 79,
        priceMin: 79,
        priceMax: 125,
        partsExtra: false,
        estimatedDuration: 60,
        displayOrder: 5,
      },
      {
        id: 'leak-shower-valve',
        name: 'Shower Valve Leak',
        unitPrice: 125,
        priceMin: 125,
        priceMax: 250,
        partsExtra: false,
        estimatedDuration: 90,
        displayOrder: 6,
      },
      {
        id: 'leak-ceiling',
        name: 'Ceiling Leak',
        description: 'Leak from above bathroom',
        unitPrice: 125,
        priceMin: 125,
        priceMax: 250,
        partsExtra: false,
        estimatedDuration: 90,
        displayOrder: 7,
      },
      {
        id: 'leak-burst-pipe',
        name: 'Burst Pipe',
        unitPrice: 167,
        priceMin: 167,
        priceMax: 250,
        partsExtra: false,
        estimatedDuration: 120,
        displayOrder: 8,
      },
      {
        id: 'leak-laundry',
        name: 'Laundry Leak',
        unitPrice: 79,
        partsExtra: false,
        estimatedDuration: 60,
        displayOrder: 9,
      },
    ],
  },
  {
    id: 'installations',
    name: 'Installations',
    description: 'Need something new hooked up? Fixtures, valves, and appliance connections.',
    category: 'installation',
    priceRangeMin: 50,
    priceRangeMax: 375,
    estimatedDuration: 90,
    displayOrder: 2,
    items: [
      {
        id: 'install-faucet',
        name: 'Faucet Installation',
        unitPrice: 104,
        partsExtra: false,
        estimatedDuration: 60,
        displayOrder: 1,
      },
      {
        id: 'install-shower',
        name: 'Shower Installation',
        unitPrice: 250,
        priceMin: 250,
        priceMax: 292,
        partsExtra: false,
        estimatedDuration: 180,
        displayOrder: 2,
      },
      {
        id: 'install-toilet',
        name: 'Toilet Installation',
        unitPrice: 125,
        partsExtra: false,
        estimatedDuration: 60,
        displayOrder: 3,
      },
      {
        id: 'install-washer-dryer',
        name: 'Washer/Dryer Hookup',
        unitPrice: 104,
        partsExtra: false,
        estimatedDuration: 60,
        displayOrder: 4,
      },
      {
        id: 'install-laundry-sink',
        name: 'Laundry Sink Installation',
        unitPrice: 208,
        partsExtra: false,
        estimatedDuration: 120,
        displayOrder: 5,
      },
      {
        id: 'install-valve',
        name: 'Valve Installation',
        unitPrice: 79,
        priceMin: 79,
        priceMax: 108,
        partsExtra: false,
        estimatedDuration: 45,
        displayOrder: 6,
      },
      {
        id: 'install-garden-hose-bib',
        name: 'Garden Hose Bib Installation',
        unitPrice: 83,
        priceMin: 83,
        priceMax: 125,
        partsExtra: false,
        estimatedDuration: 60,
        displayOrder: 7,
      },
      {
        id: 'install-main-shutoff',
        name: 'Main Shut-off Valve Installation',
        unitPrice: 292,
        priceMin: 292,
        priceMax: 375,
        partsExtra: false,
        estimatedDuration: 180,
        displayOrder: 8,
      },
      {
        id: 'install-pot-filler',
        name: 'Pot Filler Installation',
        unitPrice: 75,
        priceMin: 75,
        priceMax: 100,
        partsExtra: false,
        estimatedDuration: 60,
        displayOrder: 9,
      },
      {
        id: 'install-bidet-sprayer',
        name: 'Bidet / Handheld Sprayer',
        unitPrice: 50,
        priceMin: 50,
        priceMax: 75,
        partsExtra: false,
        estimatedDuration: 45,
        displayOrder: 10,
      },
      {
        id: 'install-toilet-fill-valve',
        name: 'Toilet Fill Valve & Flapper',
        unitPrice: 75,
        priceMin: 75,
        priceMax: 104,
        partsExtra: false,
        estimatedDuration: 45,
        displayOrder: 11,
      },
      {
        id: 'install-fridge-waterline',
        name: 'Fridge Water Line Installation',
        unitPrice: 104,
        priceMin: 104,
        priceMax: 125,
        partsExtra: false,
        estimatedDuration: 60,
        displayOrder: 12,
      },
    ],
  },
  {
    id: 'kitchen-plumbing-v2',
    name: 'Kitchen Plumbing',
    description: 'Kitchen sink, dishwasher, and plumbing reconfiguration.',
    category: 'kitchen',
    priceRangeMin: 104,
    priceRangeMax: 208,
    estimatedDuration: 120,
    displayOrder: 3,
    items: [
      {
        id: 'kitchen-complete-v2',
        name: 'Complete Kitchen Plumbing',
        unitPrice: 125,
        partsExtra: false,
        estimatedDuration: 120,
        displayOrder: 1,
      },
      {
        id: 'kitchen-dishwasher-v2',
        name: 'Dishwasher Installation',
        unitPrice: 104,
        partsExtra: false,
        estimatedDuration: 60,
        displayOrder: 2,
      },
      {
        id: 'kitchen-dishwasher-plumbing-v2',
        name: 'Dishwasher + Kitchen Plumbing',
        unitPrice: 208,
        partsExtra: false,
        estimatedDuration: 120,
        displayOrder: 3,
      },
      {
        id: 'kitchen-reconfiguration',
        name: 'Plumbing Reconfiguration',
        unitPrice: 125,
        partsExtra: false,
        estimatedDuration: 90,
        displayOrder: 4,
      },
    ],
  },
  {
    id: 'bathroom-plumbing',
    name: 'Bathroom Plumbing',
    description: 'Full bathroom plumbing: rough-in packages, vanity conversions, and remodeling.',
    category: 'bathroom',
    priceRangeMin: 42,
    priceRangeMax: 2500,
    estimatedDuration: 180,
    displayOrder: 4,
    items: [
      {
        id: 'bath-shower-diverter-basic',
        name: 'Shower Diverter (Basic)',
        unitPrice: 208,
        partsExtra: false,
        estimatedDuration: 90,
        displayOrder: 1,
      },
      {
        id: 'bath-shower-diverter-custom',
        name: 'Shower Diverter (Custom)',
        unitPrice: 250,
        partsExtra: false,
        estimatedDuration: 120,
        displayOrder: 2,
      },
      {
        id: 'bath-bathtub-install',
        name: 'Bath Tub Installation',
        description: 'Parts not included',
        unitPrice: 333,
        partsExtra: true,
        estimatedDuration: 180,
        displayOrder: 3,
      },
      {
        id: 'bath-standing-shower-drain',
        name: 'Standing Shower Drain',
        unitPrice: 208,
        partsExtra: false,
        estimatedDuration: 90,
        displayOrder: 4,
      },
      {
        id: 'bath-freestanding-tub',
        name: 'Free Standing Tub',
        description: 'Parts not included',
        unitPrice: 208,
        partsExtra: true,
        estimatedDuration: 120,
        displayOrder: 5,
      },
      {
        id: 'bath-freestanding-shower',
        name: 'Free Standing Shower',
        unitPrice: 125,
        partsExtra: false,
        estimatedDuration: 60,
        displayOrder: 6,
      },
      {
        id: 'bath-shower-fixture',
        name: 'Shower Fixture Installation',
        unitPrice: 63,
        partsExtra: false,
        estimatedDuration: 45,
        displayOrder: 7,
      },
      {
        id: 'bath-vanity-plumbing',
        name: 'Vanity Complete Plumbing',
        unitPrice: 104,
        partsExtra: false,
        estimatedDuration: 60,
        displayOrder: 8,
      },
      {
        id: 'bath-faucet-ptrap',
        name: 'Faucet + P-Trap',
        unitPrice: 79,
        partsExtra: false,
        estimatedDuration: 45,
        displayOrder: 9,
      },
      {
        id: 'bath-vanity-install-plumbing',
        name: 'Vanity Installation + Plumbing',
        unitPrice: 208,
        partsExtra: false,
        estimatedDuration: 120,
        displayOrder: 10,
      },
      {
        id: 'bath-freestanding-tub-install',
        name: 'Free Standing Tub Installation',
        unitPrice: 71,
        partsExtra: false,
        estimatedDuration: 60,
        displayOrder: 11,
      },
      {
        id: 'bath-freestanding-shower-install',
        name: 'Free Standing Shower Installation',
        unitPrice: 71,
        partsExtra: false,
        estimatedDuration: 60,
        displayOrder: 12,
      },
      {
        id: 'bath-double-vanity',
        name: 'Double Vanity + Plumbing',
        unitPrice: 375,
        partsExtra: false,
        estimatedDuration: 180,
        displayOrder: 13,
      },
      {
        id: 'bath-bidet',
        name: 'Toilet Bidet Installation',
        unitPrice: 42,
        partsExtra: false,
        estimatedDuration: 30,
        displayOrder: 14,
      },
      {
        id: 'bath-single-to-double-vanity',
        name: 'Convert Single Vanity to Double',
        unitPrice: 167,
        partsExtra: false,
        estimatedDuration: 120,
        displayOrder: 15,
      },
      {
        id: 'bath-toilet-flange-repair',
        name: 'Toilet Flange Repair',
        unitPrice: 79,
        partsExtra: false,
        estimatedDuration: 45,
        displayOrder: 16,
      },
      {
        id: 'bath-3piece-package',
        name: '3-Piece Bathroom Package',
        description: 'Complete bathroom rough-in package',
        unitPrice: 1458,
        partsExtra: false,
        estimatedDuration: 480,
        displayOrder: 17,
      },
      {
        id: 'bath-3piece-basement',
        name: '3-Piece Basement Bathroom with Permit',
        description: 'Includes permit costs',
        unitPrice: 2500,
        partsExtra: false,
        estimatedDuration: 600,
        displayOrder: 18,
      },
    ],
  },
  {
    id: 'unclog',
    name: 'Unclog / Drain Clearing',
    description: 'Clogged drain? We\'ll clear it out.',
    category: 'unclog',
    priceRangeMin: 104,
    priceRangeMax: 104,
    estimatedDuration: 60,
    displayOrder: 5,
    items: [
      {
        id: 'unclog-vanity',
        name: 'Bathroom Vanity Unclog',
        unitPrice: 104,
        partsExtra: false,
        estimatedDuration: 45,
        displayOrder: 1,
      },
      {
        id: 'unclog-toilet',
        name: 'Toilet Unclog',
        unitPrice: 104,
        partsExtra: false,
        estimatedDuration: 45,
        displayOrder: 2,
      },
      {
        id: 'unclog-bathtub',
        name: 'Bathtub Unclog',
        unitPrice: 104,
        partsExtra: false,
        estimatedDuration: 45,
        displayOrder: 3,
      },
    ],
  },
  {
    id: 'filters',
    name: 'Water Filtration & Purification',
    description: 'Clean water solutions: softeners, reverse osmosis, and filter service.',
    category: 'filter',
    priceRangeMin: 125,
    priceRangeMax: 2083,
    estimatedDuration: 120,
    displayOrder: 6,
    items: [
      {
        id: 'filter-softener-standard',
        name: 'Water Softener - Standard',
        unitPrice: 375,
        priceMin: 375,
        priceMax: 417,
        partsExtra: false,
        estimatedDuration: 120,
        displayOrder: 1,
      },
      {
        id: 'filter-softener-high-capacity',
        name: 'Water Softener - High Capacity (30k-50k grains)',
        unitPrice: 1500,
        priceMin: 1500,
        priceMax: 2083,
        partsExtra: false,
        estimatedDuration: 180,
        displayOrder: 2,
      },
      {
        id: 'filter-reverse-osmosis',
        name: 'Reverse Osmosis System',
        unitPrice: 250,
        partsExtra: false,
        estimatedDuration: 120,
        displayOrder: 3,
      },
      {
        id: 'filter-iron-tank',
        name: 'Iron Filter Tank',
        unitPrice: 1000,
        priceMin: 1000,
        priceMax: 1250,
        partsExtra: false,
        estimatedDuration: 180,
        displayOrder: 4,
      },
      {
        id: 'filter-chlorinator',
        name: 'Chlorinator / Carbon Filter',
        unitPrice: 625,
        priceMin: 625,
        priceMax: 1250,
        partsExtra: false,
        estimatedDuration: 120,
        displayOrder: 5,
      },
      {
        id: 'filter-service-change',
        name: 'Filter Service Change',
        unitPrice: 125,
        partsExtra: false,
        estimatedDuration: 45,
        displayOrder: 6,
      },
      {
        id: 'filter-relocation',
        name: 'Filter Relocation',
        unitPrice: 167,
        partsExtra: false,
        estimatedDuration: 90,
        displayOrder: 7,
      },
    ],
  },
];

/**
 * Get all service categories
 */
export const getServiceCategories = (): ServiceCategory[] => {
  return serviceCategories;
};

/**
 * Get a specific category by ID
 */
export const getCategoryById = (categoryId: string): ServiceCategory | undefined => {
  return serviceCategories.find(cat => cat.id === categoryId);
};

/**
 * Get a specific service item by ID across all categories
 */
export const getServiceItemById = (itemId: string): { category: ServiceCategory; item: ServiceItem } | undefined => {
  for (const category of serviceCategories) {
    const item = category.items.find(i => i.id === itemId);
    if (item) {
      return { category, item };
    }
  }
  return undefined;
};

/**
 * Calculate total price for selected service items (local fallback)
 * Applies 20% markup to all prices for frontend display
 * Emergency = $250 base ($300 after markup) minimum floor
 */
export const calculateTotalPrice = (
  selectedItemIds: string[],
  urgency: string,
  propertyType: string
): number => {
  let baseTotal = 0;

  // Sum up all selected items with 20% markup applied
  // Use priceMin for range items (conservative estimate)
  selectedItemIds.forEach(itemId => {
    const result = getServiceItemById(itemId);
    if (result) {
      const price = result.item.priceMin ?? result.item.unitPrice;
      baseTotal += applyPriceMarkup(price);
    }
  });

  // Apply commercial multiplier
  if (propertyType === 'commercial') {
    baseTotal = Math.round(baseTotal * 1.3);
  }

  // Emergency: $300 minimum floor (after markup)
  if (urgency === 'emergency') {
    const emergencyMin = applyPriceMarkup(EMERGENCY_FEE);
    return Math.max(emergencyMin, baseTotal);
  }

  return Math.round(baseTotal);
};

/**
 * Calculate total estimated duration (local fallback)
 */
export const calculateTotalDuration = (selectedItemIds: string[]): number => {
  let totalDuration = 0;

  selectedItemIds.forEach(itemId => {
    const result = getServiceItemById(itemId);
    if (result) {
      totalDuration += result.item.estimatedDuration;
    }
  });

  return totalDuration;
};
