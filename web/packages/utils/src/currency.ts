/**
 * Format a number as Nigerian Naira currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format a number with commas (without currency symbol)
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-NG").format(num);
}

/**
 * Calculate discount percentage
 */
export function calculateDiscountPercentage(original: number, discounted: number): number {
  if (original <= 0) return 0;
  return Math.round(((original - discounted) / original) * 100);
}

/**
 * Calculate VAT (7.5% in Nigeria)
 */
export function calculateVAT(amount: number, rate: number = 0.075): number {
  return Math.round(amount * rate);
}

/**
 * Calculate total with VAT
 */
export function calculateTotalWithVAT(amount: number, rate: number = 0.075): number {
  return amount + calculateVAT(amount, rate);
}
