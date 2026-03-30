export interface Service {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  estimatedDuration: number;
  category: 'emergency' | 'repair' | 'installation' | 'maintenance' | 'inspection' | 'drainage';
  isEmergency: boolean;
  icon?: string;
}

// Two-tier service structure
export interface ServiceItem {
  id: string;
  name: string;
  description?: string;
  unitPrice: number;
  priceMin?: number;
  priceMax?: number;
  partsExtra: boolean;
  partsPrice?: number;
  estimatedDuration: number;
  displayOrder: number;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  category: 'repair' | 'installation' | 'kitchen' | 'bathroom' | 'unclog' | 'filter' | 'maintenance';
  priceRangeMin: number;
  priceRangeMax: number;
  estimatedDuration: number;
  items: ServiceItem[];
  displayOrder: number;
}

export interface QuoteRequest {
  // Service details
  selectedServices: string[]; // Array of service item IDs
  selectedCategories: string[]; // Array of category IDs
  customService?: string; // Custom service description if not in list
  problemDescription: string;
  urgency: 'standard' | 'emergency';
  
  // Property details
  propertyType: 'house' | 'apartment' | 'commercial';
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  accessNotes?: string;
  
  // Contact details
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  
  preferredDateTime?: string;
  photos?: File[];
  
  // Privacy consent
  pipedaConsent?: boolean;
  
  // Flags
  isCustomServiceRequest?: boolean;

  // Travel fee
  distanceFee?: number;
  distanceKm?: number;

  // Calculated
  estimatedPrice?: number;
  status: 'draft' | 'submitted' | 'pending' | 'reviewed';
}

export interface QuoteResponse {
  quoteId: string;
  estimatedPrice: number;
  estimatedDuration: number;
  validUntil: Date;
  message: string;
}





