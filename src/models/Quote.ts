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

export interface QuoteRequest {
  // Service details
  selectedServices: string[];
  problemDescription: string;
  urgency: 'standard' | 'urgent' | 'emergency';
  
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





