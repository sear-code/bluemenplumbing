export const COMPANY = {
  name: 'Blue Men Plumbing',
  phone: '+16475007989',
  phoneFormatted: '647-500-7989',
  email: 'info@bluemenplumbing.com',
  address: {
    street: '65 Canadian Rd',
    city: 'Scarborough',
    province: 'ON',
    postalCode: 'M1R 5G2',
    country: 'Canada',
    full: '65 Canadian Rd, Scarborough, ON, M1R 5G2',
  },
  hours: '24/7',
  experience: '15+',
  customers: '1000+',
  googleRating: 5.0,
  googleReviewCount: 20,
  siteUrl: 'https://bluemenplumbing.com',
} as const;

export const SERVICE_SLUGS = [
  'leak-repairs',
  'installations',
  'kitchen-plumbing-v2',
  'bathroom-plumbing',
  'unclog',
  'filters',
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export const EMERGENCY_FEE = 250; // base price before 20% markup → displays as $300
