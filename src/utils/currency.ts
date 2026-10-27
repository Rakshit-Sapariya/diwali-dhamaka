/**
 * Formats a number to Indian Rupee (INR) currency representation
 * e.g. 149999 -> ₹1,49,999
 */
export function formatINR(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '₹0';
  }
  const rounded = Math.round(amount);
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(rounded);
}

/**
 * Calculates discount percentage safely:
 * Discount % = ((Original - Selling) / Original) * 100
 * Ensures never NaN, Infinity, or negative.
 */
export function calculateDiscount(originalPrice: number, sellingPrice: number): number {
  if (!originalPrice || !sellingPrice || originalPrice <= sellingPrice || originalPrice <= 0) {
    return 0;
  }
  const discount = ((originalPrice - sellingPrice) / originalPrice) * 100;
  if (!isFinite(discount) || isNaN(discount)) {
    return 0;
  }
  return Math.round(discount);
}

/**
 * Calculates net savings in rupees: Original - Selling
 */
export function calculateSavings(originalPrice: number, sellingPrice: number): number {
  if (!originalPrice || !sellingPrice || originalPrice <= sellingPrice) {
    return 0;
  }
  return originalPrice - sellingPrice;
}
