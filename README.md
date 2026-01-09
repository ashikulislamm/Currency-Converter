# GlobalXchange - Currency & Crypto Converter

A modern, real-time currency converter and cryptocurrency dashboard built with Next.js 16, React 19, and TypeScript. Track live exchange rates for fiat currencies and cryptocurrencies with an intuitive, responsive interface.

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black)
![React](https://img.shields.io/badge/React-19.2.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

## ✨ Features

### 💱 Fiat Currency Conversion
- **Real-time Exchange Rates**: Live rates from Open Exchange Rates API
- **Multi-Currency Support**: USD, EUR, BDT, GBP, JPY, CAD, AUD, CNY
- **Instant Conversion**: Convert between any supported currencies
- **Persistent Preferences**: Your currency selections saved in localStorage
- **Auto-refresh**: Rates update every 60 seconds

### 💰 Cryptocurrency Dashboard
- **Live Crypto Prices**: Real-time prices via Binance WebSocket
- **Supported Cryptocurrencies**: BTC, ETH, BNB, SOL
- **Crypto to Fiat Converter**: Convert cryptocurrency to any fiat currency
- **Animated Ticker**: Infinite scrolling ticker with live prices
- **Price Cards**: Individual cards showing current crypto values

### 📊 Advanced Features
- **Historical Charts**: 30-day trend visualization for currencies
- **Currency Detail Pages**: In-depth analysis for each currency
- **Dark Mode Support**: Beautiful dark/light theme
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Loading States**: Smooth loading indicators
- **Error Handling**: Graceful error management

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd currency-converter
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Building for Production

```bash
npm run build
npm run start
```

## 🏗️ Project Structure

```
Currency Converter/
├── app/
│   ├── currency/
│   │   └── page.tsx          # Currency detail page
│   ├── globals.css            # Global styles and animations
│   ├── layout.tsx             # Root layout with metadata
│   └── page.tsx               # Home page
├── components/
│   ├── CryptoDashboard.tsx    # Crypto ticker and converter
│   ├── CurrencyConverter.tsx  # Fiat currency converter
│   ├── CurrencySelector.tsx   # Currency dropdown selector
│   ├── HistoricalChart.tsx    # Chart component
│   ├── LoadingSpinner.tsx     # Loading indicator
│   ├── Navigation.tsx         # Header navigation
│   └── Providers.tsx          # Context providers wrapper
├── context/
│   └── CurrencyContext.tsx    # Global state management
├── hooks/
│   └── useLocalStorage.ts     # localStorage hook with SSR support
├── lib/
│   └── utils.ts               # Utility functions
├── types/
│   └── index.ts               # TypeScript type definitions
└── public/                    # Static assets
```

## 🛠️ Technologies

- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[Open Exchange Rates API](https://open.er-api.com/)** - Fiat currency rates
- **[Binance WebSocket](https://binance-docs.github.io/apidocs/spot/en/)** - Real-time crypto prices

## 🎨 Key Components

### CurrencyConverter
Bidirectional fiat currency converter with swap functionality and real-time rate display.

### CryptoDashboard
Features an infinite scrolling ticker and crypto-to-fiat converter with live price cards.

### Navigation
Responsive navigation with mobile menu support and quick access to currency pages.

### CurrencyContext
Global state management for rates, preferences, and conversion logic with WebSocket integration.

## 📱 Pages

- **`/`** - Home page with currency converter and crypto dashboard
- **`/currency?code=USD`** - Detailed currency page with historical charts and quick conversions

## 🔄 Real-time Updates

- **Fiat Rates**: Refresh every 60 seconds via REST API
- **Crypto Prices**: Live updates via WebSocket streams
- **Persistent State**: User preferences saved in localStorage

## 🎯 Features in Detail

### Infinite Ticker
Custom CSS animation creating a seamless infinite scroll effect with live cryptocurrency prices.

### Hydration-Safe localStorage
Custom hook that prevents hydration mismatches by loading localStorage values after client-side mounting.

### Responsive Design
Mobile-first design with breakpoints for tablet and desktop, including a collapsible mobile menu.

## 🔌 APIs Used

### Open Exchange Rates API
**Endpoint**: `https://open.er-api.com/v6/latest/USD`

**Reasoning**:
- Free tier with no authentication required
- Provides comprehensive exchange rates for 160+ currencies
- Reliable uptime and consistent data format
- Returns rates relative to USD as base currency
- No CORS restrictions for client-side requests

**Update Frequency**: Every 60 seconds via polling

### Binance WebSocket API
**Endpoint**: `wss://stream.binance.com:9443/stream?streams={symbols}`

**Reasoning**:
- Real-time cryptocurrency price streaming
- No authentication needed for public market data
- Minimal latency for price updates
- Supports multiple simultaneous streams
- Industry-standard for crypto market data

**Update Frequency**: Real-time push updates on every trade

## 🔄 Real-time Update Strategy

### Fiat Currency Rates
- **Method**: HTTP Polling
- **Interval**: 60 seconds
- **Implementation**: `setInterval` in `CurrencyContext`
- **Error Handling**: Silent failures with console logging
- **State Updates**: Replaces entire rates object on successful fetch

```typescript
useEffect(() => {
  fetchRates();
  const interval = setInterval(fetchRates, 60000);
  return () => clearInterval(interval);
}, []);
```

### Cryptocurrency Prices
- **Method**: WebSocket Streaming
- **Connection**: Persistent connection with automatic reconnection
- **Implementation**: Native WebSocket API in `CurrencyContext`
- **Message Format**: Binance trade stream format
- **State Updates**: Individual price updates merged into state

```typescript
const ws = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${streams}`);
ws.onmessage = (event) => {
  setCryptoRates(prev => ({ ...prev, [symbol]: price }));
};
```

## 🏛️ State Management Architecture

### Global State (CurrencyContext)
**Technology**: React Context API with hooks

**State Variables**:
- `rates: Rates` - Fiat exchange rates object
- `cryptoRates: CryptoRates` - Cryptocurrency prices
- `loading: boolean` - Initial data load status
- `lastUpdated: Date | null` - Last rate update timestamp
- `baseCurrency: CurrencyCode` - User's base currency (persisted)
- `targetCurrency: CurrencyCode` - User's target currency (persisted)

**Functions**:
- `convertFiat()` - Memoized conversion function using `useCallback`
- `setBaseCurrency()` - Updates base currency with localStorage persistence
- `setTargetCurrency()` - Updates target currency with localStorage persistence

**Reasoning**:
- Context API sufficient for this scale (no complex state relationships)
- Avoids prop drilling through multiple component levels
- `useCallback` prevents infinite re-renders
- localStorage integration for user preference persistence

### Local State
Each component manages its own UI-specific state:
- Form inputs (amount, selected currencies)
- UI toggles (menu open/closed state)
- Temporary calculations and derived values

## 📁 Folder Structure Explained

```
Currency Converter/
│
├── app/                        # Next.js App Router
│   ├── currency/
│   │   └── page.tsx           # Dynamic currency detail page
│   ├── globals.css            # Global styles, animations, Tailwind
│   ├── layout.tsx             # Root layout (server component)
│   └── page.tsx               # Home page (client component)
│
├── components/                 # Reusable React components
│   ├── CryptoDashboard.tsx    # Crypto section (ticker + converter)
│   ├── CurrencyConverter.tsx  # Main fiat converter component
│   ├── CurrencySelector.tsx   # Dropdown for currency selection
│   ├── HistoricalChart.tsx    # Chart visualization component
│   ├── LoadingSpinner.tsx     # Reusable loading indicator
│   ├── Navigation.tsx         # Header nav (client component)
│   └── Providers.tsx          # Context providers wrapper
│
├── context/                    # Global state management
│   └── CurrencyContext.tsx    # Currency state, API calls, WebSocket
│
├── hooks/                      # Custom React hooks
│   └── useLocalStorage.ts     # SSR-safe localStorage hook
│
├── lib/                        # Utility functions
│   └── utils.ts               # Formatting, mock data generation
│
├── types/                      # TypeScript definitions
│   └── index.ts               # Shared type definitions
│
└── public/                     # Static assets (images, fonts)
```

**Design Principles**:
- **Separation of Concerns**: UI components separate from business logic
- **Colocation**: Related files grouped together
- **Client/Server Separation**: Server components in app/, client components marked explicitly
- **Reusability**: Shared utilities and types in dedicated folders
- **Next.js Conventions**: Follows App Router file structure

## ⚠️ Known Limitations

### API Limitations
1. **Free Tier Restrictions**
   - Open Exchange Rates: Limited to 1,000 requests/month (hourly polling only)
   - No historical data API (using mock generated data)
   - Base currency locked to USD (requires conversion math)

2. **No Authentication**
   - Public APIs only - no API keys required
   - Limited to public endpoints
   - No rate limiting protection

### Functional Limitations
1. **Historical Data**
   - Historical charts use **mock generated data**
   - Not real historical prices
   - Generated algorithmically based on current rates

2. **Currency Support**
   - Limited to 8 predefined fiat currencies
   - Limited to 4 major cryptocurrencies
   - No dynamic currency addition

3. **Offline Functionality**
   - No offline support
   - Requires active internet connection
   - No service worker caching

### Technical Limitations
1. **Browser Compatibility**
   - Requires modern browser with WebSocket support
   - localStorage required for preferences
   - No IE11 support

2. **Performance**
   - WebSocket connection uses browser resources
   - No request debouncing on rapid user input
   - Mock data generation on every page load

3. **Error Handling**
   - Silent API failures (logged to console only)
   - No retry logic for failed requests
   - No user notifications for connection issues

### Future Improvements
- [ ] Add real historical data API integration
- [ ] Implement offline mode with service workers
- [ ] Add more currency options
- [ ] Include error notifications/toasts
- [ ] Add request retry logic
- [ ] Implement rate limiting protection
- [ ] Add unit and integration tests
- [ ] Support for cryptocurrency conversions between crypto pairs
- [ ] Add favorite currencies feature
- [ ] Implement currency comparison charts

## 🙏 Acknowledgments

- Currency data provided by [Open Exchange Rates](https://open.er-api.com/)
- Cryptocurrency prices from [Binance](https://www.binance.com/)
- Icons by [Lucide](https://lucide.dev/)

