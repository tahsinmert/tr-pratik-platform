# TR-Pratik

![Logo](static/favicon.png)

![Built with SvelteKit](https://img.shields.io/badge/Built%20with-SvelteKit-FF3E00?logo=svelte&logoColor=white)
![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?logo=vercel&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

> A high-performance calculation platform designed for the Turkish market, featuring fuel cost, loan, and VAT calculators with programmatic SEO capabilities.

## 🚀 Introduction

**TR-Pratik** is a modern, SEO-optimized web application that provides essential financial and travel calculation tools for Turkish users. Built with performance and scalability in mind, the platform leverages Server-Side Rendering (SSR) and programmatic routing to generate thousands of unique pages for city-to-city fuel calculations, making it highly discoverable through search engines.

The platform focuses on three core calculation tools:
- **Fuel Cost Calculator** - Intercity route calculations using real OSRM routing data
- **Loan Calculator** - Comprehensive amortization schedules with interest breakdowns
- **VAT Calculator** - KDV (VAT) and withholding tax calculations

## ✨ Key Features

### 🔍 Programmatic SEO
Dynamic routing generates thousands of unique pages for city combinations, enabling comprehensive coverage of intercity routes across Turkey. Each route gets its own optimized page with proper meta tags, structured data, and SEO-friendly URLs.

### ⚡ Server-Side Rendering (SSR)
Fast initial page loads and crawler-friendly HTML ensure excellent performance and search engine visibility. All calculation pages are pre-rendered on the server for optimal user experience.

### 🧮 Advanced Calculators

#### Fuel Cost Calculator
- Real-time distance calculation using OSRM routing API
- Support for multiple fuel types (Benzin, Motorin)
- Customizable fuel prices and consumption rates
- Route summary with estimated travel time
- Related routes suggestions

#### Loan Calculator
- Monthly payment calculations
- Complete amortization schedule
- Total interest and principal breakdown
- Visual payment distribution charts
- Support for various loan types

#### VAT Calculator
- KDV (VAT) included/excluded calculations
- Withholding tax (Tevkifat) support
- Multiple VAT rate options (1%, 10%, 20%)
- Custom VAT rate input
- Detailed calculation breakdown

### 📱 Responsive UI
Mobile-first design built with Tailwind CSS, featuring:
- Modern, high-end fintech aesthetic
- Large, touch-friendly input fields
- Gradient result cards with copy-to-clipboard functionality
- Smooth focus states and transitions
- Optimized for all screen sizes

## 🛠️ Tech Stack

- **[SvelteKit](https://kit.svelte.dev/)** - Full-stack framework with SSR support
- **[Svelte 5](https://svelte.dev/)** - Modern reactive framework
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[OSRM](https://project-osrm.org/)** - Open Source Routing Machine API for distance calculations
- **[Vercel](https://vercel.com/)** - Deployment platform
- **Vite** - Next-generation frontend tooling

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ and npm (or pnpm/yarn)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/tr-pratik.git
cd tr-pratik
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 📁 Project Structure

```
tr-pratik/
├── src/
│   ├── lib/
│   │   ├── components/      # Reusable Svelte components
│   │   ├── data/            # City data and coordinates
│   │   ├── services/        # API services (fuel prices, etc.)
│   │   └── utils/           # Utility functions
│   └── routes/
│       └── hesapla/         # Calculation pages
│           ├── [slug]/      # Dynamic fuel calculation routes
│           ├── kredi/       # Loan calculator
│           └── kdv/         # VAT calculator
├── static/                   # Static assets
└── package.json
```

## 🗺️ Roadmap

- [ ] Dark mode support
- [ ] Additional calculation tools (Currency converter, Tax calculator)
- [ ] User accounts and saved calculations
- [ ] API endpoints for third-party integrations
- [ ] Multi-language support
- [ ] Progressive Web App (PWA) capabilities
- [ ] Advanced analytics and insights

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [OSRM](https://project-osrm.org/) for providing free routing services
- [Svelte](https://svelte.dev/) team for the amazing framework
- Turkish financial data sources for accurate calculations

---

Made with ❤️ for the Turkish market
