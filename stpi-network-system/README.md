# STPI Smart Network Monitoring System

Enterprise-style **educational** network operations dashboard with simulated data only. No real network scanning, credentials in repo, or offensive tooling.

## Features

- **Command Center** — Live KPIs, Recharts, device table, AI-style insights
- **Advanced Analytics** — Line, area, bar, pie, radar charts + heatmap; time filters (today / 24h / 7d / 30d)
- **Network Topology** — React Flow map with Socket.IO updates
- **Device Management** — CRUD, enable/disable, filters
- **Enterprise WiFi Controller** — 19 SSIDs, encrypted vault, RBAC, floor management, live events ([docs/WIFI_MODULE.md](docs/WIFI_MODULE.md))
- **WiFi / Users / Alerts** — Real-time tables and alert center with severity tabs
- **Reports** — Daily / weekly / monthly export (PDF, CSV, Excel-compatible)
- **Global Search** — Devices, IPs, WiFi, alerts (`Ctrl+K`)
- **Settings** — Theme, notifications, refresh interval, password change
- **Auth** — JWT + MongoDB admin user

## Architecture

```
┌─────────────────┐     REST + Socket.IO      ┌──────────────────┐
│  React (Vite)   │ ◄──────────────────────► │  Express API     │
│  Tailwind       │   monitoring-snapshot    │  Socket.IO       │
│  Recharts       │   (batched / 3s)         │  networkSimulator│
│  React Flow     │                          │  deviceMgmt      │
└─────────────────┘                          └────────┬─────────┘
                                                      │
                                              ┌───────▼────────┐
                                              │ MongoDB Atlas  │
                                              │ (auth users)   │
                                              └────────────────┘
```

| Module | Role |
|--------|------|
| `networkSimulator.js` | Simulated metrics, alerts, WiFi, users |
| `topologySimulator.js` | Enterprise graph + live node metrics |
| `deviceManagementService.js` | In-memory device inventory CRUD |
| `analyticsExtended.js` | Range-based chart datasets |
| `insightsService.js` | Rule-based “AI” insights |
| `reportsService.js` | Report payloads for export |

## Prerequisites

- Node.js 18+
- MongoDB 6+ (local or Atlas)
- npm

## Installation

### Backend

```bash
cd server
cp .env.example .env
npm install
npm run seed:admin
npm run seed:wifi
npm run dev
```

API: **http://localhost:5001** (port 5001 avoids conflicts with PostgreSQL on 5000)

### Frontend

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

App: **http://localhost:5173**

### Demo login

| Email | Password |
|-------|----------|
| `admin@stpi.com` | `Admin123` |

If login fails: `cd server && npm run seed:admin`

## Environment variables

### Server (`server/.env`)

| Variable | Description |
|----------|-------------|
| `PORT` | API port (default `5001`) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Signing secret (long random string in production) |
| `CLIENT_URL` | Frontend origin for CORS / Socket.IO |

### Client (`client/.env`)

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | e.g. `http://localhost:5001/api` |
| `VITE_SOCKET_URL` | e.g. `http://localhost:5001` |

## Deployment

### Frontend — Vercel

1. Import repo, set root directory to `client`
2. Build: `npm run build`, output: `dist`
3. Set `VITE_API_URL` and `VITE_SOCKET_URL` to your Render API URL

`client/vercel.json` includes SPA rewrites.

### Backend — Render

1. New Web Service, root: `server`
2. Build: `npm install`, start: `npm start`
3. Set `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL` (Vercel URL)

See `server/render.yaml` for a starter blueprint.

### Database — MongoDB Atlas

1. Create free cluster → Connect → connection string
2. Set `MONGO_URI` on Render
3. Run `npm run seed:admin` locally against Atlas URI once

## Screenshots

_Add screenshots of Dashboard, Analytics, Topology, and Reports here after deployment._

## API overview (protected)

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/login` | JWT login |
| GET | `/api/network/*` | Monitoring data |
| GET/POST/PUT/DELETE | `/api/enterprise/devices` | Device CRUD |
| GET | `/api/enterprise/analytics/extended?range=` | Charts data |
| GET | `/api/enterprise/insights` | AI-style insights |
| GET | `/api/enterprise/reports?period=` | Report JSON |
| GET | `/api/enterprise/search?q=` | Global search |

## Future improvements

- Persist device inventory in MongoDB
- Role-based access (operator vs admin)
- Email/webhook alert delivery
- Real SNMP/API integrations behind adapter layer
- Chart data caching and Redis pub/sub for scale

## License

Educational / demonstration use. Simulated data only.
