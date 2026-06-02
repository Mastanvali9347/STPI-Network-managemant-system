# Architecture Overview

## Client (`client/`)

| Path | Purpose |
|------|---------|
| `src/api/` | Axios client and REST wrappers |
| `src/assets/` | Static images and icons |
| `src/components/` | Reusable UI (Navbar, Sidebar, cards) |
| `src/pages/` | Route-level views |
| `src/layouts/` | Dashboard and auth shells |
| `src/routes/` | React Router config and guards |
| `src/hooks/` | Data fetching and Socket.IO hooks |
| `src/context/` | Auth state |
| `src/services/` | Socket.IO singleton |
| `src/topology/` | React Flow nodes and canvas |
| `src/dashboard/` | Recharts widgets |
| `src/styles/` | Tailwind entry and theme tokens |
| `src/utils/` | Constants and formatters |

## Server (`server/`)

| Path | Purpose |
|------|---------|
| `config/` | Database and environment |
| `controllers/` | Request handlers |
| `middleware/` | JWT auth and errors |
| `models/` | Mongoose schemas |
| `routes/` | Express routers |
| `services/` | Live metrics generator |
| `sockets/` | Socket.IO event wiring |
| `utils/` | Dummy sample datasets |
| `seed/` | MongoDB seed script |
| `scanner/` | Passive simulation stub (no exploitation) |

## Data Flow

1. Admin logs in via `/api/auth/login` → JWT stored in browser.
2. Protected pages call `/api/network/*` with Bearer token.
3. Socket.IO pushes `network:metrics` every 5 seconds to the dashboard.
4. Alerts channel emits occasional `alerts:new` events for the Alerts page.
