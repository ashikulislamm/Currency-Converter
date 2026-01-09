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

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Currency data provided by [Open Exchange Rates](https://open.er-api.com/)
- Cryptocurrency prices from [Binance](https://www.binance.com/)
- Icons by [Lucide](https://lucide.dev/)

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Built with ❤️ using Next.js and React**
