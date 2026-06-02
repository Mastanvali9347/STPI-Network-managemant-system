/** Lightweight signature so we skip React Flow updates when nothing meaningful changed. */
export const topologySignature = (topology) => {
  if (!topology?.nodes?.length) return '';
  const nodes = topology.nodes
    .map((n) => `${n.id}:${n.status}:${n.traffic}:${n.latency}:${n.activeUsers}`)
    .join('|');
  const edges = (topology.edges || [])
    .map((e) => `${e.id}:${e.health}:${e.trafficLoad}`)
    .join('|');
  const m = topology.metrics || {};
  return `${nodes}#${edges}#${m.onlinePercent}:${m.activeTrafficMbps}:${m.failedDevices}`;
};
