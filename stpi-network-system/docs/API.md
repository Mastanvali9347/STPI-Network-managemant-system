# API Reference (Sample)

Base URL: `http://localhost:5000/api`

## Authentication

### POST `/auth/register`

```json
{ "name": "Admin Name", "email": "admin@stpi.com", "password": "Admin123" }
```

### POST `/auth/login`

```json
{ "email": "admin@stpi.com", "password": "Admin123" }
```

### GET `/auth/profile`

Requires header: `Authorization: Bearer <token>`

Response:

```json
{
  "token": "<jwt>",
  "user": { "id": "...", "name": "...", "email": "...", "role": "admin" }
}
```

## Network (Bearer token required)

| Endpoint | Description |
|----------|-------------|
| `GET /network/dashboard` | Live dashboard metrics |
| `GET /network/topology` | Nodes and edges for React Flow |
| `GET /network/wifi` | SSID list |
| `GET /network/users` | Connected clients |
| `GET /network/alerts` | Alert feed |
| `GET /network/analytics` | Charts data |

## Socket.IO Events

| Event | Direction | Payload |
|-------|-----------|---------|
| `network:metrics` | Server → Client | Dashboard metrics object |
| `alerts:subscribe` | Client → Server | — |
| `alerts:new` | Server → Client | Alert object |
