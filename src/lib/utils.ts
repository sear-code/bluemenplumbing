import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Apply 20% markup to price for frontend display
 * Does not affect database prices
 */
export const applyPriceMarkup = (price: number): number => {
  return Math.round(price * 1.2);
}
