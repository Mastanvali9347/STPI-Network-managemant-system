/**
 * Simulated enterprise SSID catalog — educational/demo only.
 * Plaintext passwords exist only during seeding, then encrypted at rest.
 */

const FLOORS = [
  'Ground Floor',
  'Floor 1',
  'Floor 2',
  'Server Room',
  'Conference Hall',
  'Admin Office',
];

const APS = [
  'AP-Ground-Lobby',
  'AP-Floor1-East',
  'AP-Floor2-West',
  'AP-Server-Room',
  'AP-Conference',
  'AP-Admin',
  'AP-Ruckus-Zone-A',
];

const enterpriseSsids = [
  { ssid: 'STPI-RUCKUS', floor: 'Floor 1', ap: 'AP-Ruckus-Zone-A', band: '5 GHz', channel: 36, security: 'WPA3-Enterprise', vlan: 10 },
  { ssid: 'Airtel_Zerotouch', floor: 'Ground Floor', ap: 'AP-Ground-Lobby', band: '5 GHz', channel: 40, security: 'WPA2-Enterprise', vlan: 20 },
  { ssid: 'Amg', floor: 'Floor 1', ap: 'AP-Floor1-East', band: '2.4 GHz', channel: 6, security: 'WPA2-Personal', vlan: 30 },
  { ssid: 'Amg_5G', floor: 'Floor 1', ap: 'AP-Floor1-East', band: '5 GHz', channel: 44, security: 'WPA2-Personal', vlan: 30 },
  { ssid: 'Demo_01', floor: 'Conference Hall', ap: 'AP-Conference', band: '2.4 GHz', channel: 11, security: 'WPA2-Personal', vlan: 40 },
  { ssid: 'Excel_ARB', floor: 'Floor 2', ap: 'AP-Floor2-West', band: '2.4 GHz', channel: 1, security: 'WPA2-Enterprise', vlan: 50 },
  { ssid: 'Excel_Soft', floor: 'Floor 2', ap: 'AP-Floor2-West', band: '5 GHz', channel: 48, security: 'WPA2-Enterprise', vlan: 50 },
  { ssid: 'HYSEA_2G', floor: 'Admin Office', ap: 'AP-Admin', band: '2.4 GHz', channel: 6, security: 'WPA2-Personal', vlan: 60 },
  { ssid: 'HYSEA_5G', floor: 'Admin Office', ap: 'AP-Admin', band: '5 GHz', channel: 149, security: 'WPA2-Personal', vlan: 60 },
  { ssid: 'IMAGE-COE', floor: 'Floor 1', ap: 'AP-Floor1-East', band: '5 GHz', channel: 52, security: 'WPA3-Enterprise', vlan: 70 },
  { ssid: 'IMAGE-GUEST', floor: 'Ground Floor', ap: 'AP-Ground-Lobby', band: '2.4 GHz', channel: 1, security: 'WPA2-Personal', vlan: 80 },
  { ssid: 'Intelligenz IT', floor: 'Server Room', ap: 'AP-Server-Room', band: '5 GHz', channel: 36, security: 'WPA2-Enterprise', vlan: 90 },
  { ssid: 'Intellizent2025', floor: 'Conference Hall', ap: 'AP-Conference', band: '5 GHz', channel: 100, security: 'WPA3-Enterprise', vlan: 95 },
  { ssid: 'OneDigitals-5GHz', floor: 'Floor 2', ap: 'AP-Floor2-West', band: '5 GHz', channel: 104, security: 'WPA2-Personal', vlan: 100 },
  { ssid: 'POCO M7 5G', floor: 'Ground Floor', ap: 'AP-Ground-Lobby', band: '5 GHz', channel: 108, security: 'WPA2-Personal', vlan: 110 },
  { ssid: 'Realme 12 5G', floor: 'Ground Floor', ap: 'AP-Ground-Lobby', band: '5 GHz', channel: 112, security: 'WPA2-Personal', vlan: 110 },
  { ssid: 'SPARK-Employee', floor: 'Admin Office', ap: 'AP-Admin', band: '5 GHz', channel: 116, security: 'WPA2-Enterprise', vlan: 120 },
  { ssid: 'STL-2.4G', floor: 'Floor 1', ap: 'AP-Floor1-East', band: '2.4 GHz', channel: 11, security: 'WPA2-Personal', vlan: 130 },
  { ssid: 'SxnTechTeam', floor: 'Server Room', ap: 'AP-Server-Room', band: '5 GHz', channel: 120, security: 'WPA3-Enterprise', vlan: 140 },
];

/** Demo passwords — rotated in seed only; never returned by list APIs */
const demoPasswordFor = (ssid) => `STPI-${ssid.replace(/[^a-zA-Z0-9]/g, '').slice(0, 8)}!2025`;

module.exports = { enterpriseSsids, FLOORS, APS, demoPasswordFor };
