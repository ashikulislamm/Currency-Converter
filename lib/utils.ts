
export const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(amount);
};

export const safeFormat = (val: number) => {
  return Math.abs(val) < 0.000001 ? '0' : parseFloat(val.toFixed(6)).toString();
};

export const generateMockHistory = (baseVal: number) => {
  const days = 30;
  const data = [];
  let current = baseVal;
  const now = new Date();
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const change = (Math.random() - 0.5) * (baseVal * 0.02);
    current += change;
    data.push({
      date: date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      value: Math.abs(current)
    });
  }
  return data;
};
