/**
 * Format a number as USD currency string
 */
export const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
};

export const formatCompact = (amount) =>
  amount >= 1000 ? `$${(amount / 1000).toFixed(1)}k` : `$${amount.toFixed(2)}`;
