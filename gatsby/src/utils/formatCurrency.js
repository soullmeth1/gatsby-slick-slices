const format = Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
});

export default function formatCurrency(price) {
  return format.format(price / 100);
}
