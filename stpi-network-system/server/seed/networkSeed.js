/**
 * Documents dummy network seed data used by networkSimulator.
 * Run: node seed/networkSeed.js (informational)
 */
const { BASE_DEVICES, BASE_WIFI, getSnapshot } = require('../services/networkSimulator');

console.log('STPI Network Monitor — Simulated seed data\n');
console.log('Devices:', BASE_DEVICES.length);
BASE_DEVICES.forEach((d) => console.log(`  - ${d.deviceName} (${d.ipAddress})`));
console.log('\nWiFi networks:', BASE_WIFI.length);
BASE_WIFI.forEach((w) => console.log(`  - ${w.wifiName} [password: ********]`));
console.log('\nLive snapshot summary:', getSnapshot().summary);
