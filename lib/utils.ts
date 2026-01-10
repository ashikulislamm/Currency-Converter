export const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(amount);
};

export const safeFormat = (val: number) => {
  return Math.abs(val) < 0.000001 ? "0" : parseFloat(val.toFixed(6)).toString();
};

// Fetch real historical data from exchangerate.host API
export const fetchHistoricalData = async (
  baseCurrency: string,
  targetCurrency: string,
  days: number
) => {
  try {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const formatDate = (date: Date) => date.toISOString().split("T")[0];

    const start = formatDate(startDate);
    const end = formatDate(endDate);

    console.log(
      `Fetching historical data: ${baseCurrency} to ${targetCurrency}, ${start} to ${end}`
    );

    // Try frankfurter.app API (more reliable and simpler)
    try {
      const response = await fetch(
        `https://api.frankfurter.app/${start}..${end}?from=${baseCurrency}&to=${targetCurrency}`
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Frankfurter API Response:", data);

        if (data.rates && Object.keys(data.rates).length > 0) {
          const historicalData = Object.entries(data.rates)
            .map(([dateStr, rates]: [string, any]) => {
              const date = new Date(dateStr);
              let dateLabel: string;

              if (days <= 7) {
                dateLabel = date.toLocaleDateString(undefined, {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                });
              } else if (days <= 30) {
                dateLabel = date.toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                });
              } else {
                dateLabel = date.toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                });
              }

              return {
                date: dateLabel,
                value:
                  typeof rates === "object" ? rates[targetCurrency] : rates,
              };
            })
            .filter((item) => item.value > 0)
            .sort((a, b) => {
              const dateA = Object.keys(data.rates).find((k) =>
                a.date.includes(new Date(k).getDate().toString())
              );
              const dateB = Object.keys(data.rates).find((k) =>
                b.date.includes(new Date(k).getDate().toString())
              );
              return (
                new Date(dateA || 0).getTime() - new Date(dateB || 0).getTime()
              );
            });

          console.log("Processed historical data:", historicalData);
          return historicalData;
        }
      }
    } catch (apiError) {
      console.error("Frankfurter API error:", apiError);
    }

    // If API fails, return empty array
    console.log("API failed, returning empty data");
    return [];
  } catch (error) {
    console.error("Error fetching historical data:", error);
    // Return empty array if everything fails
    return [];
  }
};
