/**
 * Simulated enterprise SSID catalog — STPI company in KPHB, Hyderabad.
 * Office hours: 7:00 AM - 7:00 PM (IST)
 */

const OFFICE_HOURS = {
  START: 7,    // 7:00 AM
  END: 19,     // 7:00 PM
  TIMEZONE: 'Asia/Kolkata',
};

const LOCATION = {
  name: 'KPHB',
  city: 'Hyderabad',
  country: 'India',
  organization: 'STPI',
};

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

/** Only STPI company networks - office hours based */
const enterpriseSsids = [
  { ssid: 'STPI-RUCKUS', floor: 'Floor 1', ap: 'AP-Ruckus-Zone-A', band: '5 GHz', channel: 36, security: 'WPA3-Enterprise', vlan: 10, location: LOCATION.name },
  { ssid: 'STPI-GUEST', floor: 'Ground Floor', ap: 'AP-Ground-Lobby', band: '2.4 GHz', channel: 1, security: 'WPA2-Personal', vlan: 80, location: LOCATION.name },
  { ssid: 'STPI-CONFERENCE', floor: 'Conference Hall', ap: 'AP-Conference', band: '5 GHz', channel: 149, security: 'WPA3-Enterprise', vlan: 70, location: LOCATION.name },
  { ssid: 'STPI-SERVER', floor: 'Server Room', ap: 'AP-Server-Room', band: '5 GHz', channel: 36, security: 'WPA2-Enterprise', vlan: 90, location: LOCATION.name },
];

/** Demo passwords — rotated in seed only; never returned by list APIs */
const demoPasswordFor = (ssid) => `STPI-${ssid.replace(/[^a-zA-Z0-9]/g, '').slice(0, 8)}!2025`;

/** Check if current time is within office hours */
const isOfficeHours = () => {
  const now = new Date();
  const hour = Number(
    new Intl.DateTimeFormat('en-US', {
      timeZone: OFFICE_HOURS.TIMEZONE,
      hour: '2-digit',
      hour12: false,
    }).format(now)
  );
  return hour >= OFFICE_HOURS.START && hour < OFFICE_HOURS.END;
};

module.exports = { enterpriseSsids, FLOORS, APS, demoPasswordFor, OFFICE_HOURS, LOCATION, isOfficeHours };
