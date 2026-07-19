# Project Astra - Crime Intelligence Platform

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

A comprehensive crime intelligence dashboard powered by **Google Gemini AI**, designed for law enforcement agencies to analyze, predict, and visualize crime patterns across districts.

## Features

### Dashboard
- Real-time crime statistics and KPIs
- Active alerts with severity indicators
- District-level crime summaries

### Crime Map
- Interactive Leaflet-based geospatial visualization
- District boundary rendering
- Crime incident clustering and heatmaps

### Network Analysis
- POLE (Person, Object, Location, Event) graph visualization
- Criminal network link analysis
- Relationship mapping between entities

### Modus Operandi Search
- Semantic search across FIR narratives
- Similar crime pattern matching
- AI-powered case similarity scoring

### AI Copilot
- Natural language crime data queries
- Step-by-step reasoning transparency
- Entity extraction and visualization

### Alerts System
- Anomaly detection with Z-score analysis
- Real-time crime spike notifications
- Configurable severity thresholds

### Predictive Analytics
- H3 hexagonal risk scoring
- SHAP-based feature importance
- Temporal and socioeconomic risk factors

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, TypeScript |
| Styling | Tailwind CSS 4 |
| AI | Google Gemini (`@google/genai`) |
| Maps | Leaflet |
| Animations | Motion (Framer Motion) |
| Build | Vite |

## Prerequisites

- Node.js 18+
- Bun (recommended) or npm
- Gemini API key

## Getting Started

### 1. Install Dependencies

```bash
# Using Bun (recommended)
bun install

# Or using npm
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env.local` and add your API keys:

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
GEMINI_API_KEY=your_gemini_api_key_here
APP_URL=http://localhost:3000
```

### 3. Run Development Server

```bash
# Using Bun
bun run dev

# Or using npm
npm run dev
```

The app will be available at `http://localhost:3000`.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | TypeScript type checking |
| `npm run clean` | Remove build artifacts |

## Project Structure

```
project-astra---crime-intelligence/
├── src/
│   ├── components/
│   │   ├── Sidebar.tsx          # Navigation sidebar
│   │   ├── DashboardView.tsx    # Main dashboard
│   │   ├── CrimeMapView.tsx     # Geospatial visualization
│   │   ├── NetworkView.tsx      # POLE graph analysis
│   │   ├── MOSearchView.tsx     # Modus Operandi search
│   │   ├── CopilotView.tsx      # AI assistant interface
│   │   ├── AlertsView.tsx       # Alert management
│   │   └── PredictionsView.tsx  # Predictive analytics
│   ├── types.ts                 # TypeScript interfaces
│   ├── mockData.ts              # Sample data
│   ├── App.tsx                  # Root component
│   ├── main.tsx                 # Entry point
│   └── index.css                # Global styles
├── assets/                      # Static assets
├── .env.example                 # Environment template
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Data Model

The platform uses the following core data structures:

- **Incident** - FIR records with geolocation and severity scores
- **Alert** - Anomaly detection results with Z-score analysis
- **POLENode/Edge** - Graph entities and relationships
- **MOSearchResult** - Semantic search matches
- **PredictionHex** - H3-based risk predictions with SHAP values

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API key | Yes |
| `APP_URL` | Application base URL | Yes |

## License

This project was developed as part of the Google AI Studio Hackathon.

---

Built with ❤️ for law enforcement intelligence
