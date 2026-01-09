
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

export const generateMockHistory = (baseVal: number, days: number = 30) => {
  const data = [];
  let current = baseVal;
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Create more realistic random walk with smaller variance for shorter periods
    const volatility = days === 7 ? 0.01 : days === 30 ? 0.015 : 0.02;
    const change = (Math.random() - 0.5) * (baseVal * volatility);
    current += change;
    
    // Format date based on time period
    let dateLabel;
    if (days <= 7) {
      // Show day of week for 7 days
      dateLabel = date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
    } else if (days <= 30) {
      // Show date for 30 days
      dateLabel = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    } else {
      // Show month/day for 90 days
      dateLabel = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    }
    
    data.push({
      date: dateLabel,
      value: Math.abs(current)
    });
  }
  
  return data;
};
