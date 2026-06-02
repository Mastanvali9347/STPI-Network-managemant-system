/**
 * Passive network inventory stub for demonstration only.
 * Does NOT perform intrusive scanning or exploitation.
 * Returns synthetic device metadata for UI development.
 */

const { sampleTopology } = require('../utils/dummyData');

const scanLocalSegment = async () => {
  return {
    scannedAt: new Date().toISOString(),
    mode: 'simulation',
    devicesFound: sampleTopology.nodes.length,
    nodes: sampleTopology.nodes.map((node) => ({
      id: node.id,
      label: node.label,
      type: node.type,
      status: node.status,
    })),
  };
};

module.exports = { scanLocalSegment };
