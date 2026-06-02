# Enterprise WiFi Management Module

## Architecture

```
┌──────────────┐     JWT + RBAC      ┌─────────────────────┐
│ React WiFi   │ ◄──────────────────►│ /api/wifi/*         │
│ Dashboard    │                     │ wifiController      │
└──────┬───────┘                     └──────────┬──────────┘
       │ Socket.IO                               │
       │ monitoring-snapshot                     ▼
       │                              ┌─────────────────────┐
       └─────────────────────────────►│ wifiManagementService│
                                      │  + wifiSimulator     │
                                      │  + cryptoVault       │
                                      └──────────┬──────────┘
                                                 │
                                      ┌──────────▼──────────┐
                                      │ MongoDB               │
                                      │ WifiNetwork (encrypted)│
                                      │ WifiAccessLog (audit)  │
                                      └───────────────────────┘
```

## Security model

| Role | Permissions |
|------|-------------|
| **super_admin** | Full access, reveal passwords, audit logs |
| **network_admin** | Manage devices, reveal passwords |
| **viewer** | Dashboard read-only, passwords always masked |

Legacy roles map automatically: `admin` → super_admin, `operator` → network_admin.

## Encryption flow

1. **Seed** (`npm run seed:wifi`): plaintext demo passwords exist only in memory during seeding.
2. **Encrypt**: `cryptoVault.js` uses **AES-256-GCM** with key derived from `WIFI_VAULT_KEY`.
3. **Store**: ciphertext in `WifiNetwork.passwordEncrypted` (never selected in list APIs).
4. **Reveal**: `POST /api/wifi/networks/:id/reveal-password` requires:
   - JWT + `REVEAL_WIFI_PASSWORD` permission
   - User re-enters login password (verification)
   - Entry written to `WifiAccessLog`
5. **Response**: plaintext returned once in HTTPS response; UI masks by default.

## Socket.IO updates

Every 3s the server:

1. Runs `wifiManagement.tick()` (metrics + client simulation)
2. Runs `networkSimulator.tick()` (merges WiFi into snapshot)
3. Emits `monitoring-snapshot` with `wifi`, `wifiClients`, `wifiEvents`, `floorStats`, `wifiAnalytics`

## Setup

```bash
cd server
npm run seed:admin
npm run seed:wifi
npm run dev
```

## Future improvements

- Integrate real RADIUS / controller APIs behind adapter layer
- Per-SSID RBAC and approval workflows
- Hardware AP SNMP polling
- Geo map for AP placement
