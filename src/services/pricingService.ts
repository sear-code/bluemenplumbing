import { Service } from '@/models/Quote';

// Sample pricing data - matches Blue Men Plumbing services
export const servicesData: Service[] = [
  {
    id: 'drain-cleaning',
    name: 'Drain Cleaning',
    description: 'Professional drain cleaning and unclogging services',
    basePrice: 150,
    estimatedDuration: 60,
    category: 'maintenance',
    isEmergency: false,
  },
  {
    id: 'leak-repair',
    name: 'Leak Repair',
    description: 'Fix leaks in pipes, faucets, and fixtures',
    basePrice: 200,
    estimatedDuration: 90,
    category: 'repair',
    isEmergency: false,
  },
  {
    id: 'water-heater',
    name: 'Water Heater Service',
    description: 'Repair or replacement of water heaters',
    basePrice: 350,
    estimatedDuration: 180,
    category: 'installation',
    isEmergency: false,
  },
  {
    id: 'pipe-installation',
    name: 'Pipe Installation',
    description: 'New pipe installation and replacement',
    basePrice: 300,
    estimatedDuration: 120,
    category: 'installation',
    isEmergency: false,
  },
  {
    id: 'bathroom-renovation',
    name: 'Bathroom Renovation',
    description: 'Complete bathroom plumbing renovation',
    basePrice: 1500,
    estimatedDuration: 480,
    category: 'installation',
    isEmergency: false,
  },
  {
    id: 'emergency-service',
    name: 'Emergency Plumbing',
    description: 'Immediate response for urgent plumbing issues',
    basePrice: 300,
    estimatedDuration: 120,
    category: 'emergency',
    isEmergency: true,
  },
];

export const pricingService = {
  calculateEstimate: (
    serviceIds: string[],
    urgency: string,
    propertyType: string
  ): number => {
    const services = servicesData.filter((s) => serviceIds.includes(s.id));
    const baseTotal = services.reduce((sum, s) => sum + s.basePrice, 0);
    
    // Apply multipliers based on urgency and property type
    let multiplier = 1.0;
    
    if (urgency === 'emergency') multiplier += 0.5;
    else if (urgency === 'urgent') multiplier += 0.25;
    
    if (propertyType === 'commercial') multiplier += 0.3;
    
    return Math.round(baseTotal * multiplier);
  },

  getServices: (): Service[] => servicesData,
  
  getServiceById: (id: string): Service | undefined => 
    servicesData.find((s) => s.id === id),
};





