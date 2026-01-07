import { ServiceCategory } from '@/models/Quote';

/**
 * Two-tier service structure with categories and items
 * Based on Blue Men Plumbing actual price list
 */
export const serviceCategories: ServiceCategory[] = [
  {
    id: 'bathroom-rough-in',
    name: 'Bathroom Rough-In',
    description: 'Complete plumbing installation for new bathrooms during construction or renovation (behind walls)',
    category: 'rough-in',
    icon: '🚿',
    priceRangeMin: 50,
    priceRangeMax: 3000,
    estimatedDuration: 240,
    displayOrder: 1,
    items: [
      {
        id: 'rough-shower-diverter-basic',
        name: 'Shower Diverter (Basic)',
        unitPrice: 250,
        partsExtra: false,
        estimatedDuration: 90,
        displayOrder: 1,
      },
      {
        id: 'rough-shower-diverter-custom',
        name: 'Shower Diverter (Custom)',
        unitPrice: 300,
        partsExtra: false,
        estimatedDuration: 120,
        displayOrder: 2,
      },
      {
        id: 'rough-bathtub-install',
        name: 'Bath Tub Installation',
        description: 'Parts not included',
        unitPrice: 400,
        partsExtra: true,
        estimatedDuration: 180,
        displayOrder: 3,
      },
      {
        id: 'rough-standing-shower-drain',
        name: 'Standing Shower Drain',
        unitPrice: 250,
        partsExtra: false,
        estimatedDuration: 90,
        displayOrder: 4,
      },
      {
        id: 'rough-freestanding-tub',
        name: 'Free Standing Tub',
        description: 'Parts not included',
        unitPrice: 250,
        partsExtra: true,
        estimatedDuration: 120,
        displayOrder: 5,
      },
      {
        id: 'rough-freestanding-shower',
        name: 'Free Standing Shower',
        unitPrice: 150,
        partsExtra: false,
        estimatedDuration: 60,
        displayOrder: 6,
      },
      {
        id: 'rough-valve-install',
        name: 'Valve Installation',
        unitPrice: 50,
        partsExtra: false,
        estimatedDuration: 30,
        displayOrder: 7,
      },
      {
        id: 'rough-fridge-waterline',
        name: 'Fridge Water Line',
        unitPrice: 125,
        partsExtra: false,
        estimatedDuration: 60,
        displayOrder: 8,
      },
      {
        id: 'rough-single-to-double-vanity',
        name: 'Convert Single Vanity to Double',
        unitPrice: 200,
        partsExtra: false,
        estimatedDuration: 120,
        displayOrder: 9,
      },
      {
        id: 'rough-toilet-flange-repair',
        name: 'Toilet Flange Repair',
        unitPrice: 95,
        partsExtra: false,
        estimatedDuration: 45,
        displayOrder: 10,
      },
      {
        id: 'rough-3piece-bathroom',
        name: '3-Piece Bathroom Rough-In (Complete Package)',
        description: 'Complete bathroom rough-in package',
        unitPrice: 1750,
        partsExtra: false,
        estimatedDuration: 480,
        displayOrder: 11,
      },
      {
        id: 'rough-3piece-basement',
        name: '3-Piece Bathroom Basement with Permit',
        description: 'Includes permit costs',
        unitPrice: 3000,
        partsExtra: false,
        estimatedDuration: 600,
        displayOrder: 12,
      },
    ],
  },
  {
    id: 'bathroom-finishing',
    name: 'Bathroom Finishing',
    description: 'Installation of bathroom fixtures and final plumbing connections (visible parts)',
    category: 'finishing',
    icon: '🛁',
    priceRangeMin: 50,
    priceRangeMax: 450,
    estimatedDuration: 120,
    displayOrder: 2,
    items: [
      {
        id: 'finish-shower-fixture',
        name: 'Shower Fixture Installation',
        unitPrice: 75,
        partsExtra: false,
        estimatedDuration: 45,
        displayOrder: 1,
      },
      {
        id: 'finish-vanity-plumbing-only',
        name: 'Vanity Complete Plumbing ONLY',
        unitPrice: 125,
        partsExtra: false,
        estimatedDuration: 60,
        displayOrder: 2,
      },
      {
        id: 'finish-faucet-ptrap',
        name: 'Faucet + P-Trap ONLY',
        unitPrice: 95,
        partsExtra: false,
        estimatedDuration: 45,
        displayOrder: 3,
      },
      {
        id: 'finish-vanity-install-plumbing',
        name: 'Vanity Installation + Plumbing',
        unitPrice: 250,
        partsExtra: false,
        estimatedDuration: 120,
        displayOrder: 4,
      },
      {
        id: 'finish-toilet-install',
        name: 'Toilet Installation',
        unitPrice: 125,
        partsExtra: false,
        estimatedDuration: 60,
        displayOrder: 5,
      },
      {
        id: 'finish-freestanding-tub',
        name: 'Free Standing Tub Installation',
        unitPrice: 85,
        partsExtra: false,
        estimatedDuration: 60,
        displayOrder: 6,
      },
      {
        id: 'finish-freestanding-shower',
        name: 'Free Standing Shower Installation',
        unitPrice: 85,
        partsExtra: false,
        estimatedDuration: 60,
        displayOrder: 7,
      },
      {
        id: 'finish-double-vanity',
        name: 'Double Vanity + Plumbing',
        unitPrice: 450,
        partsExtra: false,
        estimatedDuration: 180,
        displayOrder: 8,
      },
      {
        id: 'finish-toilet-bidet',
        name: 'Toilet Bidet Installation',
        unitPrice: 50,
        partsExtra: false,
        estimatedDuration: 30,
        displayOrder: 9,
      },
    ],
  },
  {
    id: 'kitchen-plumbing',
    name: 'Kitchen Plumbing',
    description: 'Complete kitchen plumbing installation including appliances and fixtures',
    category: 'kitchen',
    icon: '🍽️',
    priceRangeMin: 125,
    priceRangeMax: 250,
    estimatedDuration: 120,
    displayOrder: 3,
    items: [
      {
        id: 'kitchen-complete',
        name: 'Complete Kitchen Plumbing',
        unitPrice: 150,
        partsExtra: false,
        estimatedDuration: 120,
        displayOrder: 1,
      },
      {
        id: 'kitchen-dishwasher',
        name: 'Dishwasher Installation',
        unitPrice: 125,
        partsExtra: false,
        estimatedDuration: 60,
        displayOrder: 2,
      },
      {
        id: 'kitchen-dishwasher-plumbing',
        name: 'Dishwasher + Kitchen Plumbing',
        unitPrice: 250,
        partsExtra: false,
        estimatedDuration: 120,
        displayOrder: 3,
      },
    ],
  },
  {
    id: 'laundry-connections',
    name: 'Laundry Connections',
    description: 'Washing machine and dryer water and drain connections',
    category: 'laundry',
    icon: '🧺',
    priceRangeMin: 85,
    priceRangeMax: 130,
    estimatedDuration: 60,
    displayOrder: 4,
    items: [
      {
        id: 'laundry-no-parts',
        name: 'Washing Machine + Dryer (No Parts)',
        unitPrice: 85,
        partsExtra: false,
        estimatedDuration: 45,
        displayOrder: 1,
      },
      {
        id: 'laundry-with-parts',
        name: 'Washing Machine + Dryer (With Parts)',
        unitPrice: 130,
        partsExtra: false,
        estimatedDuration: 60,
        displayOrder: 2,
      },
    ],
  },
  {
    id: 'repairs-troubleshooting',
    name: 'Repairs & Troubleshooting',
    description: 'Quick repairs and leak troubleshooting for existing plumbing',
    category: 'repair',
    icon: '🔧',
    priceRangeMin: 95,
    priceRangeMax: 95,
    estimatedDuration: 60,
    displayOrder: 5,
    items: [
      {
        id: 'repair-leak-troubleshoot',
        name: 'Leak Troubleshoot',
        unitPrice: 95,
        partsExtra: false,
        estimatedDuration: 60,
        displayOrder: 1,
      },
      {
        id: 'repair-leak-fix',
        name: 'Leak Fix',
        unitPrice: 95,
        partsExtra: false,
        estimatedDuration: 60,
        displayOrder: 2,
      },
      {
        id: 'repair-faucet-replacement',
        name: 'Faucet Replacement',
        unitPrice: 95,
        partsExtra: false,
        estimatedDuration: 45,
        displayOrder: 3,
      },
      {
        id: 'repair-random-parts',
        name: 'Random Plumbing Parts Installation',
        description: 'Parts not included',
        unitPrice: 95,
        partsExtra: true,
        estimatedDuration: 45,
        displayOrder: 4,
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
 */
export const calculateTotalPrice = (
  selectedItemIds: string[],
  urgency: string,
  propertyType: string
): number => {
  let baseTotal = 0;

  // Sum up all selected items
  selectedItemIds.forEach(itemId => {
    const result = getServiceItemById(itemId);
    if (result) {
      baseTotal += result.item.unitPrice;
    }
  });

  // Apply multipliers based on urgency and property type
  let multiplier = 1.0;

  if (urgency === 'emergency') multiplier += 0.5;
  else if (urgency === 'urgent') multiplier += 0.25;

  if (propertyType === 'commercial') multiplier += 0.3;

  return Math.round(baseTotal * multiplier);
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

