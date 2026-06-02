/**
 * Client-side fallback sample data (mirrors server dummyData).
 * Used for documentation and optional offline UI previews.
 */

export const sampleTopology = {
  nodes: [
    { id: 'internet', type: 'cloud', label: 'Internet Gateway', status: 'online' },
    { id: 'core-sw', type: 'switch', label: 'Core Switch CS-01', status: 'online' },
  ],
  edges: [{ id: 'e1', source: 'internet', target: 'core-sw' }],
};

export const sampleWifi = [
  { ssid: 'STPI-Corporate', band: '5 GHz', clients: 42, status: 'active' },
];
