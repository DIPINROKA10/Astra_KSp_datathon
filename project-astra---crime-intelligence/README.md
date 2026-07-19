<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />

# Project Astra - Crime Intelligence Platform

**Karnataka State Police AI-Powered Crime Analytics Dashboard**

[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06b6d4)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-6-646cff)](https://vitejs.dev)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI-4285f4)](https://ai.google.dev)

</div>

---

## Overview

Project Astra is a comprehensive crime intelligence dashboard built for the **Google AI Studio Hackathon**. It empowers law enforcement agencies with AI-driven tools to analyze, predict, and visualize crime patterns across all 31 districts of Karnataka, India.

The platform combines **Google Gemini AI**, advanced geospatial analytics, graph-based criminal network analysis, and predictive modeling into a single responsive interface accessible on both desktop and mobile devices.

---

## Key Capabilities

### Intelligence Dashboard
- Real-time crime KPIs (Total FIRs, Active Alerts, High-Risk Zones)
- Weekly incident trend visualization with forecast bars
- Active alert management with severity indicators (HIGH/MEDIUM/LOW)
- Recent ingested case files with SHA-256 integrity verification

### Crime Map (Geospatial)
- Interactive **Leaflet** map with CartoDB Voyager tiles
- Concentric pulsing heatmap halos for crime hotspots
- District-level filtering across all 31 Karnataka districts
- Crime type filtering (Theft, Chain Snatching, Cybercrime, Murder, etc.)
- Prediction overlay with dashed risk zone indicators
- Click-to-inspect risk cells with **SHAP waterfall** explainability charts

### POLE Network Analysis
- **Person, Object, Location, Event** graph visualization
- Dynamic node positioning that adapts to screen size
- Touch-drag panning and pinch/button zoom controls
- Confirmed vs. AI-predicted (**CrimeGAT**) relationship edges
- Node detail panels (offender scores, vehicle registration, coordinates)
- Mobile bottom-sheet detail panel for phone access

### Semantic MO Search
- Natural language **Modus Operandi** search across 12,847+ FIR records
- pgvector cosine-similarity pattern matching
- Similarity score ranking with progress bars
- Raw FIR narrative excerpts with BNS/IPC statute cross-referencing

### AI Copilot
- Multi-agent crime intelligence assistant powered by **Gemini AI**
- Transparent agent execution pipeline (Supervisor → SQL-Agent → Vector-Agent → Synthesis)
- Entity extraction with interactive tags (PERSON, LOCATION, OBJECT, EVENT)
- Pre-built query templates for quick access
- Chat history with typing indicators

### Alert System
- Z-score statistical outbreak detection engine
- Automated anomaly alerts with configurable severity thresholds
- 5-minute detection scan frequency
- Alert dismiss/acknowledge workflow
- Historical and active alarm tracking

### Predictive Analytics
- **STGCN** (Spatio-Temporal Graph Convolutional Network) predictions
- H3 resolution-8 hexagonal grid cells
- T+48 hour forecasting horizon
- SHAP-based feature importance breakdown:
  - Recent Crime Density (45%)
  - Day of Week (22%)
  - Hour of Day (14%)
  - Socioeconomic Index (8%)
  - Population Density (6%)
- Risk probability scoring with confidence coefficients

---

## Responsive Design

The application is fully responsive and works across all device sizes:

| Feature | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Sidebar Navigation | Fixed side panel | Fixed side panel | Hamburger drawer |
| Dashboard Grid | 4-column stats | 2-column stats | 2-column compact |
| Tables | Full columns | Full columns | Horizontally scrollable |
| Map Controls | Side-by-side | Compact layout | Stacked/hidden |
| POLE Network | Side panel details | Side panel details | Bottom sheet |
| Copilot Templates | Visible sidebar | Visible sidebar | Menu toggle overlay |
| Node Detail Panels | Right side panel | Right side panel | Slide-up bottom sheet |

### Mobile Features
- Touch-drag panning on graph views
- Pinch-to-zoom and button zoom controls
- Bottom-sheet panels for node inspection
- Collapsible sidebar with overlay backdrop
- Compact typography and spacing
- Horizontal scroll for data tables

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | React 19 + TypeScript | Component architecture |
| Styling | Tailwind CSS 4 | Utility-first responsive design |
| AI Engine | Google Gemini (`@google/genai`) | Natural language processing |
| Maps | Leaflet + CartoDB | Geospatial visualization |
| Animations | Motion (Framer Motion) | Smooth transitions |
| Build | Vite 6 | Fast development & bundling |
| Fonts | Inter + JetBrains Mono | UI + monospace display |

---

## Getting Started

### Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** or **Bun** (recommended)
- **Gemini API Key** from [Google AI Studio](https://ai.google.dev)

### 1. Clone & Install

```bash
git clone <repository-url>
cd project-astra---crime-intelligence

# Install dependencies
npm install
# or
bun install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
GEMINI_API_KEY=your_gemini_api_key_here
APP_URL=http://localhost:3000
```

### 3. Start Development Server

```bash
npm run dev
```

Open **http://localhost:3000** in your browser.

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | TypeScript type checking |
| `npm run clean` | Remove build artifacts |

---

## Project Structure

```
project-astra---crime-intelligence/
├── src/
│   ├── components/
│   │   ├── Sidebar.tsx          # Responsive nav (drawer on mobile)
│   │   ├── DashboardView.tsx    # Stats grid + charts + alerts
│   │   ├── CrimeMapView.tsx     # Leaflet map + heatmap + predictions
│   │   ├── NetworkView.tsx      # POLE graph + CrimeGAT + drag/zoom
│   │   ├── MOSearchView.tsx     # Semantic search + results
│   │   ├── CopilotView.tsx      # AI chat + agent pipeline
│   │   ├── AlertsView.tsx       # Alert management + z-score display
│   │   └── PredictionsView.tsx  # STGCN model metrics + H3 cells
│   ├── types.ts                 # TypeScript interfaces
│   ├── mockData.ts              # 8 FIR incidents, 4 alerts, 7 predictions
│   ├── App.tsx                  # Root layout + mobile sidebar state
│   ├── main.tsx                 # Entry point
│   └── index.css                # Global styles + animations
├── assets/                      # Static assets
├── .env.example                 # Environment template
├── index.html                   # HTML entry with viewport meta
├── package.json                 # Dependencies & scripts
├── tsconfig.json                # TypeScript config
└── vite.config.ts               # Vite build config
```

---

## Data Model

| Type | Description |
|------|-------------|
| `Incident` | FIR records with geolocation, severity scores, BNS/IPC sections, SHA-256 hash |
| `Alert` | Z-score anomaly detection results with severity levels |
| `POLENode` | Graph entities: PERSON, LOCATION, OBJECT, EVENT with properties |
| `POLEEdge` | Entity relationships (confirmed + CrimeGAT AI-predicted) |
| `MOSearchResult` | Semantic search matches with similarity scores |
| `CopilotMessage` | Chat messages with reasoning steps and extracted entities |
| `PredictionHex` | H3 hexagonal risk predictions with SHAP attribution values |
| `UserProfile` | Analyst user profile |

---

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API key for AI copilot | Yes |
| `APP_URL` | Application base URL (auto-injected in production) | Yes |

---

## Mock Data Coverage

The platform ships with realistic Karnataka crime data:

- **8 FIR Incidents** across 4 districts (Bengaluru Urban, Mysuru, Belagavi, Dharwad)
- **4 Active Alerts** (2 HIGH, 1 MEDIUM, 1 LOW severity)
- **7 Prediction Cells** with H3 hex indices and SHAP values
- **15 POLE Nodes** (5 Persons, 3 Vehicles, 3 Locations, 3 Events)
- **15 POLE Edges** (12 confirmed + 3 CrimeGAT AI-predicted)
- **4 MO Search Results** with similarity scores
- **31 Karnataka Districts** in filter dropdowns
- **8 Crime Categories** (Theft, Chain Snatching, Robbery, Cybercrime, etc.)

---

## Architecture Decisions

1. **Responsive-First**: All components use Tailwind's `md:` breakpoint system with mobile-specific UI patterns (drawers, bottom sheets, horizontal scroll)
2. **Dynamic Graph Layout**: POLE Network positions nodes based on actual container dimensions via `ResizeObserver`, not hardcoded pixels
3. **Touch Support**: Graph canvas supports pointer events for drag-pan on mobile devices
4. **Overlay Pattern**: Side panels become fixed overlays on mobile with backdrop dismissal
5. **Component Isolation**: Each view is a self-contained component with its own state management

---

## License

Developed for the **Google AI Studio Hackathon**.

---

<div align="center">

Built for law enforcement intelligence analysis

</div>
