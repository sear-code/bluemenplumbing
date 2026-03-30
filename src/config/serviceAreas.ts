export const TRAVEL_RATE_PER_KM = 1;
export const MAX_SERVICE_RADIUS_KM = 60;

export interface CityConfig {
  name: string;
  zone: 'core' | 'extended';
  distanceKm: number;
  nearestCoreCity: string;
}

export const SERVICE_CITIES: CityConfig[] = [
  // Core Service Area — no travel charge
  { name: 'North York', zone: 'core', distanceKm: 0, nearestCoreCity: '' },
  { name: 'Scarborough', zone: 'core', distanceKm: 0, nearestCoreCity: '' },
  { name: 'Markham', zone: 'core', distanceKm: 0, nearestCoreCity: '' },
  { name: 'Richmond Hill', zone: 'core', distanceKm: 0, nearestCoreCity: '' },
  { name: 'Pickering', zone: 'core', distanceKm: 0, nearestCoreCity: '' },
  { name: 'Ajax', zone: 'core', distanceKm: 0, nearestCoreCity: '' },
  { name: 'Toronto', zone: 'core', distanceKm: 0, nearestCoreCity: '' },

  // Extended Service Area — $1/km from nearest core city
  { name: 'Etobicoke', zone: 'extended', distanceKm: 15, nearestCoreCity: 'North York' },
  { name: 'Whitby', zone: 'extended', distanceKm: 12, nearestCoreCity: 'Ajax' },
  { name: 'Oshawa', zone: 'extended', distanceKm: 24, nearestCoreCity: 'Ajax' },
  { name: 'Bowmanville', zone: 'extended', distanceKm: 45, nearestCoreCity: 'Ajax' },
  { name: 'Mississauga', zone: 'extended', distanceKm: 28, nearestCoreCity: 'Scarborough' },
  { name: 'Oakville', zone: 'extended', distanceKm: 45, nearestCoreCity: 'Scarborough' },
  { name: 'Burlington', zone: 'extended', distanceKm: 58, nearestCoreCity: 'Scarborough' },
  { name: 'Vaughan', zone: 'extended', distanceKm: 18, nearestCoreCity: 'Richmond Hill' },
  { name: 'Brampton', zone: 'extended', distanceKm: 35, nearestCoreCity: 'Richmond Hill' },
  { name: 'Newmarket', zone: 'extended', distanceKm: 22, nearestCoreCity: 'Richmond Hill' },
];

export const CORE_CITIES = SERVICE_CITIES.filter(c => c.zone === 'core');
export const EXTENDED_CITIES = SERVICE_CITIES.filter(c => c.zone === 'extended');

export type TravelFeeResult =
  | { type: 'core' }
  | { type: 'extended'; fee: number; distanceKm: number; nearestCoreCity: string }
  | { type: 'not-listed' };

export function getTravelFee(cityName: string): TravelFeeResult {
  const city = SERVICE_CITIES.find(c => c.name === cityName);
  if (!city) return { type: 'not-listed' };
  if (city.zone === 'core') return { type: 'core' };
  if (city.distanceKm > MAX_SERVICE_RADIUS_KM) return { type: 'not-listed' };
  return {
    type: 'extended',
    fee: city.distanceKm * TRAVEL_RATE_PER_KM,
    distanceKm: city.distanceKm,
    nearestCoreCity: city.nearestCoreCity,
  };
}
